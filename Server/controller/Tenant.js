const { PrismaClient } = require("@prisma/client");
const jwt = require("jsonwebtoken")
const Prisma = new PrismaClient()

exports.createProfile = async (req, res) => {
    try {
      const  userId  = req.user.id; // Assuming userId is passed in the request body
      const {dateOfBirth} = req.body
      console.log(dateOfBirth)
      const { address,name, bloodGroup, contactNumber, emergencyContact, gender, profession } = req.body;
      console.log(userId)
      console.log("first")
      

      console.log(name,address,contactNumber,bloodGroup,dateOfBirth,emergencyContact,gender,profession)
  
      // Check if all required fields are provided
      if (!userId || !address || !bloodGroup || !contactNumber || !dateOfBirth || !emergencyContact || !gender || !profession) {
        console.log("error")
        return res.status(400).json({
          success: false,
          message: "All fields are required",
        });
      }
      console.log("second")
      const dob = new Date(dateOfBirth); // This will automatically include time (00:00:00) for valid dates like '2004-06-10'
      if (isNaN(dob)) {
        return res.status(400).json({
          success: false,
          message: "Invalid date format for date of birth",
        });
      }
  
      // Check if the user exists in the database
      const userExists = await Prisma.user.findUnique({
        where: { id: userId },
      });
  
      if (!userExists) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      // Create the tenant profile in the database
      const tenant = await Prisma.tenant.create({
        data: {
          userId,
          name,
          address,
          bloodGroup,
          contact: contactNumber,
          dob,
          emergencyContact,
          gender,
          profession,
          image: "", // Optionally add an image URL if applicable
        },
      });
  
      return res.status(201).json({
        success: true,
        message: "Profile created successfully",
        tenant,
      });
    } catch (error) {
      console.error("Error creating profile:", error);
      return res.status(500).json({
        success: false,
        message: "Failed to create profile",
      });
    }
  };


exports.getAllPGs = async(req,res) => {
  try{
    const pgBuilding = await Prisma.pGBuilding.findMany({
      include: {
        rooms: {
          include: {
            cots: true,
          },
        },
        amenities:{
          include:{
            
          }
        }
      },
    });
    if(!pgBuilding){
      res.status(404).json({
        success : false,
        message : "Unable to fetch the PG Building . Please try Again!.",
      })
    }

    res.status(200).json({
      success : true,
      data : pgBuilding,
      message : "Successfully fetched the PG Buildings."
    })
  }
  catch(error){
    console.log(error);
    console.error(error);
    res.status(400).json({
      success : false,
      message : 'Something went wrong. Plese try Again!.',
    })
  }
}

exports.viewPG = async(req,res) => {
  try{
    const {id} = req.body;
console.log("Id",id);

    if(!id){
      res.status(404).json({
        success : false,
        message : "Id is missing."
      })
    }

    const pgBuilding = await Prisma.pGBuilding.findUnique({
      where : {
        id : parseInt(id),
      },
      include : {
          amenities:{
            include:{

            }
          },
          rooms:{
            include:{
              cots:{
                include:{
    
                }
              }

            }
          },


          
      }
    })

    if(!pgBuilding){
      res.status(404).json({
        success : false,
        message : "unable to fetch the PG Building Details. Please try Again!."
      })
    };

    return res.status(200).json({
      success : true,
      data : pgBuilding,
      message : "Successfully fetched the PG Building Details."
    })
  }
  catch(error){
    console.log(error);
    console.error(error);
    return res.status(400).json({
      success : false,
      message : 'Something went wrong while fetching the PG details. Please try Again!.'
    })
  }
}

exports.getPGsByCity = async(res,req) => {
  try{
    const{city} = req.body;

    if(!city){
      res.status(404).json({
        success : false,
        message : "City data is missing."
      })
    }

    const PGsInfo = await Prisma.pGBuilding.findMany({
      where : {
        city : city,
      },
      include : {
        id : true,
        name : true,
        image : true,
        landmark : true,
        city : true,
        state : true,
        genderType : true,
      }
    });

    if(!PGsInfo){
      res.status(404).json({
        success : false,
        message : "Unable to fetch the PG building information based on the city. Please try Again!."
      })
    }

    res.status(200).json({
      success : true,
      data : PGsInfo,
      message : "Succesfully fetched the PG building information based on the city."
    });
  }
  catch(error){
    console.log(error);
    console.error(error);
    res.status(400).json({
      success : false,
      message : "Something went wrong while fetching the PG information. Please try Again!."
    })
  }
}

