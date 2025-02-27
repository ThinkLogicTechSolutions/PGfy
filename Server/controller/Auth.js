const OTPgenerator = require("otp-generator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient();
const { TWILIO_SERVICE_SID, TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN } =
  process.env;
const client = require("twilio")(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, {
  lazyLoading: true,
});

exports.sendOTP = async (req, res) => {
  const countryCode = "91";
  const { phoneNumber } = req.body;

  try {
    const isPhoneNumberExistsAlready = await Prisma.user.findFirst({
      where: { phone: phoneNumber },
    });

    if (isPhoneNumberExistsAlready) {
      return res.status(400).json({
        success: false,
        message: "Account with this phone number is already registered",
      });
    }

    const otpResponse = await client.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verifications.create({
        to: `+${countryCode}${phoneNumber}`,
        channel: "sms",
      });

    return res.status(200).json({
      success: true,
      message: "OTP sent successfully",
      otpResponse,
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

exports.verifyOTP = async (req, res) => {
  const { phoneNumber, otp } = req.body;
  const countryCode = "91";

  try {
    const verifiedResponse = await client.verify.v2
      .services(TWILIO_SERVICE_SID)
      .verificationChecks.create({
        to: `+${countryCode}${phoneNumber}`,
        code: otp,
      });

    if (verifiedResponse.status === "approved") {
      const user = await Prisma.user.findFirst({
        where: { phone: phoneNumber },
      });

      if (user) {
        const token = jwt.sign(
          {
            id: user.id,
            phone: user.phone,
            // accountType: user.accountType,
          },
          process.env.JWT_SECRET,
          { expiresIn: "240h" } // Token expiration
        );

        // Save token in the database (optional)
        await Prisma.user.update({
          where: { id: user.id },
          data: { token },
        });

        return res.status(200).json({
          success: true,
          message: "OTP verified, user authenticated successfully",
          token,
          user,
        });
      }

      // If user doesn't exist, proceed to signup
      return res.status(200).json({
        success: true,
        message: "OTP verified successfully. Please complete signup.",
        needsSignup: true,
      });
    }

    return res.status(400).json({
      success: false,
      message: "Invalid OTP or verification failed",
    });
  } catch (error) {
    res.status(error?.status || 400).json({
      success: false,
      message: error?.message || "Something went wrong while verifying OTP",
    });
  }
};

exports.signup = async (req, res) => {
  const { fullName, email, phone, password, accountType } = req.body;
  if (!["Owner", "Tenant"].includes(accountType)) {
    return res.status(400).json({ message: "Invalid account type." });
  }

  try {
    const existingUser = await Prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Prisma.user.create({
      data: {
        email,
        phone,
        password: hashedPassword,
        accountType,
      },
    });

    if (accountType === "Owner") {
      await Prisma.owner.create({
        data: {
          name: fullName,
          contact: phone,
          ownerType: "General",
          userId: user.id,
        },
      });
    }

    const token = jwt.sign(
      {
        id: user.id,
        phone: user.phone,
        accountType: user.accountType,
      },
      process.env.JWT_SECRET,
      { expiresIn: "240h" }
    );
    console.log("Generated Token:", token);
    console.log("Token id", user.id);
    await Prisma.user.update({
      where: { id: user.id },
      data: { token: token },
    });

    return res.cookie("token", token, { httpOnly: true }).status(201).json({
      success: true,
      message: "User registered successfully.",
      token,
      user,
    });
  } catch (error) {
    console.error("Error during signup:", error);
    return res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { phone, password } = req.body;
    if (!phone || !password) {
      return res.status(404).json({
        success: false,
        message: "Some data is missing",
      });
    }

    const user = await Prisma.user.findFirst({ where: { phone } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not registered",
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (passwordMatch) {
      const token = jwt.sign(
        {
          id: user.id,
          phone: user.phone,
          accountType: user.accountType,
        },
        process.env.JWT_SECRET,
        { expiresIn: "240h" } // Set token expiration
      );

      // Save token in the database (optional)
      await Prisma.user.update({
        where: { id: user.id },
        data: { token },
      });

      return res
        .cookie("token", token, {
          expires: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), // 10 days
          httpOnly: true,
        })
        .status(200)
        .json({
          success: true,
          token,
          user,
          message: "Logged in successfully",
        });
    } else {
      return res.status(400).json({
        success: false,
        message: "Log in unsuccessful",
      });
    }
  } catch (e) {
    console.error("Login error:", e);
    return res.status(400).json({
      success: false,
      message: "Login operation failed",
    });
  }
};

exports.changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const id = req.user.id;

    const user = await Prisma.user.findFirst({ where: { id } });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const passwordValid = await bcrypt.compare(oldPassword, user.password);

    if (!passwordValid) {
      return res.status(400).json({
        success: false,
        message: "Old password incorrect",
      });
    }

    const newHashedPassword = await bcrypt.hash(newPassword, 10);
    await Prisma.user.update({
      where: { id: req.user.id },
      data: { password: newHashedPassword },
    });

    return res.status(200).json({
      success: true,
      message: "Password reset successful",
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: "Password cannot be changed",
    });
  }
};


exports.getUserId = async (req, res) => {
  const token = req.cookies.token; 
  if (!token) {
    return res.status(400).json({ message: "Authorization token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    return res.json({ userId });
  } catch (err) {
    return res
      .status(401)
      .json({ message: "Invalid or expired token", error: err.message });
  }
};
