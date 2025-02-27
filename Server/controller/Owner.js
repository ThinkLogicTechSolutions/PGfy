const express = require("express");
const { PrismaClient } = require("@prisma/client");
const Prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

exports.createNewPg = async (req, res) => {
  const {
    pgName,
    streetNameArea,
    pincode,
    cityTown,
    landmark,
    state,
    floors,
    amenities: {
      typeOfPG: genderType,
      servicesOffered = [],
      specialAmenities = [],
      extraItems = [],
    } = {},
    nonAcRoomPricing, // Extract directly from req.body
    acRoomPricing,    // Extract directly from req.body
  } = req.body;

  try {
    const owner = await Prisma.owner.findUnique({
      where: { userId: req.user.id },
    });

    if (!owner) {
      return res
        .status(400)
        .json({ error: "Owner not found for the given userId." });
    }

    // Create PG Building
    const newPG = await Prisma.pGBuilding.create({
      data: {
        name: pgName,
        locality: streetNameArea,
        city: cityTown,
        streetName: streetNameArea,
        landmark: landmark || "",
        locationCoordinates: pincode,
        state: state,
        genderType: genderType || null,
        numberOfFloors: floors?.length || null,
        totalOccupancy: null,
        hasMess: servicesOffered?.includes("Meal") || null,
        ownerId: owner.id,
        seaterPrice: {
          nonAcRoomPricing,
          acRoomPricing,
        }, // Store pricing inside seaterPrice
      },
    });

    // Process Rooms, Cots, and Amenities
    let totalOccupancy = 0;

    for (let floorIndex = 0; floorIndex < floors.length; floorIndex++) {
      const floorNumber = floorIndex + 1;

      for (let roomIndex = 0; roomIndex < floors[floorIndex].rooms.length; roomIndex++) {
        const room = floors[floorIndex].rooms[roomIndex];

        // Determine Seater Type based on number of cots
        const seaterType = getSeaterType(room.cots.length);

        // Create Room with seaterType
        const newRoom = await Prisma.room.create({
          data: {
            roomNumber: `Floor-${floorNumber}-Room-${roomIndex + 1}`,
            floorNumber: floorNumber,
            pgBuildingId: newPG.id,
            seater: seaterType, // Assign seaterType
          },
        });

        const cots = Array.isArray(room.cots) ? room.cots : [];

        for (const cot of cots) {
          await Prisma.cot.create({
            data: {
              cotNumber: cot,
              roomId: newRoom.id,
            },
          });
          totalOccupancy++;
        }
      }
    }

    await Prisma.pGBuilding.update({
      where: { id: newPG.id },
      data: { totalOccupancy },
    });

    const amenitiesData = {
      wifi: servicesOffered?.includes("Wi-fi") || false,
      meal: servicesOffered?.includes("Meal") || false,
      laundry: servicesOffered?.includes("Laundry") || false,
      furnishing: servicesOffered?.includes("Furnished rooms") || false,
      commonarea: servicesOffered?.includes("Common area") || false,
      securityguard: servicesOffered?.includes("Security guard") || false,
      parking: specialAmenities?.includes("Parking") || false,
      gym: specialAmenities?.includes("Gym") || false,
      airConditioner: specialAmenities?.includes("Air conditioning") || false,
      housekeeping: servicesOffered?.includes("House keeping") || false,
      cctv: servicesOffered?.includes("CCTV") || false,
      additionalAmenities: extraItems || [],
    };

    await Prisma.amenities.create({
      data: {
        pgBuildingId: newPG.id,
        ...amenitiesData,
      },
    });

    return res.status(201).json({
      success: true,
      pg: newPG,
      totalOccupancy,
      amenities: amenitiesData,
      message: "PG created successfully with all details.",
    });
  } catch (error) {
    console.error("Error in createPG controller:", error);
    return res.status(500).json({ error: "Internal server error." });
  }
};

const getSeaterType = (cotCount) => {
  switch (cotCount) {
    case 1:
      return "OneSeater";
    case 2:
      return "TwoSeater";
    case 3:
      return "ThreeSeater";
    case 4:
      return "FourSeater";
    case 5:
      return "FiveSeater";
    case 6:
      return "SixSeater";
    default:
      return null; // Or you can throw an error if the cot count is invalid
  }
};



exports.getPGDetailsByUser = async (req, res) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res
        .status(400)
        .json({ message: "Authorization token is missing" });
    }

    // Decode token and extract userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // Fetch the Owner using userId
    const owner = await Prisma.owner.findUnique({
      where: { userId: userId }, // Find Owner by userId
    });
    console.log(owner);

    if (!owner) {
      return res.status(404).json({ message: "Owner not found for this user" });
    }

    // Fetch PG details using ownerId
    const pgDetails = await Prisma.pGBuilding.findMany({
      where: { ownerId: owner.id }, // Use ownerId from Owner model
    });

    if (!pgDetails || pgDetails.length === 0) {
      return res
        .status(404)
        .json({ message: "No PG details found for this owner" });
    }

    return res.status(200).json({
      success: true,
      message: "PG details fetched successfully",
      data: pgDetails,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Failed to fetch PG details" });
  }
};

exports.getPGDetails = async (req, res) => {
  try {
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Fetch Owner
    const owner = await Prisma.owner.findFirst({
      where: { userId: userId },
      select: { id: true },
    });

    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    // Fetch All PG Buildings
    const pgBuildings = await Prisma.pGBuilding.findMany({
      where: { ownerId: owner.id },
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

    if (pgBuildings.length === 0) {
      return res.status(404).json({ message: "No PG buildings found" });
    }

    // Calculate Summary for Each PG
    const pgDetails = pgBuildings.map((pgBuilding) => {
      const totalBeds = pgBuilding.rooms.reduce(
        (acc, room) => acc + room.cots.length,
        0
      );

      const occupiedBeds = pgBuilding.rooms.reduce(
        (acc, room) => acc + room.cots.filter((cot) => cot.isOccupied).length,
        0
      );

      const vacantBeds = totalBeds - occupiedBeds;
      const occupancyRate =
        totalBeds > 0 ? (occupiedBeds / totalBeds) * 100 : 0;

      const summary = {
        totalBeds,
        occupiedBeds,
        vacantBeds,
        occupancyRate: `${occupancyRate.toFixed(2)}%`,
      };

      return {
        pgBuilding,
        summary,
      };
    });

    // Return Data
    return res.json({ success: true, pgDetails });
  } catch (error) {
    console.error("Error fetching PG details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getOwnerDetails = async (req, res) => {
  try {
    const ownerId = req.params.ownerId || req.user?.id;
    console.log("Owner ID received:", ownerId);

    if (!ownerId) {
      return res.status(400).json({ message: "Owner ID is required" });
    }

    const ownerIdInt = parseInt(ownerId, 10);
    console.log("Parsed Owner ID:", ownerIdInt);

    const owner = await Prisma.owner.findUnique({
      where: {
        id: ownerIdInt,
      },
      select: {
        id: true,
        name: true,
      },
    });

    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    return res.json({ success: true, owner });
  } catch (error) {
    console.error("Error fetching owner details:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

exports.getPGRoomChart = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { pgBuildingId } = req.params;

    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!pgBuildingId) {
      return res.status(400).json({ message: "PG Building ID is required" });
    }

    const owner = await Prisma.owner.findFirst({
      where: { userId },
      select: { id: true },
    });

    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    const pgBuilding = await Prisma.pGBuilding.findFirst({
      where: {
        id: parseInt(pgBuildingId),
        ownerId: owner.id,
      },
      select: {
        id: true,
        name: true,
        rooms: {
          orderBy: { floorNumber: "asc" },
          select: {
            floorNumber: true,
            roomNumber: true,
            hasAc: true,
            cots: {
              orderBy: { cotNumber: "asc" },
              select: {
                cotNumber: true,
                isOccupied: true,
              },
            },
          },
        },
      },
    });

    if (!pgBuilding) {
      return res.status(404).json({ message: "PG Building not found" });
    }

    const floorData = pgBuilding.rooms.reduce((acc, room) => {
      const { floorNumber, roomNumber, hasAc, cots } = room;

      if (!acc[floorNumber]) {
        acc[floorNumber] = {
          floorNumber,
          rooms: [],
        };
      }

      acc[floorNumber].rooms.push({
        roomNumber,
        hasAc,
        cots: cots.map((cot) => ({
          cotNumber: cot.cotNumber,
          isOccupied: cot.isOccupied,
        })),
      });

      return acc;
    }, {});

    const floors = Object.values(floorData).sort(
      (a, b) => a.floorNumber - b.floorNumber
    );

    return res.json({
      success: true,
      buildingId: pgBuilding.id,
      buildingName: pgBuilding.name,
      floors,
    });
  } catch (error) {
    console.error("Error fetching Room Chart:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.updateRoomChart = async (req, res) => {
  try {
    const userId = req.user?.id;
    const { pgBuildingId, roomNumber, cotNumber, isBlocked } = req.body;

    // Validate request inputs
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    if (!pgBuildingId || !roomNumber || !cotNumber || isBlocked === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Verify owner
    const owner = await Prisma.owner.findFirst({
      where: { userId },
      select: { id: true },
    });

    if (!owner) {
      return res.status(404).json({ message: "Owner not found" });
    }

    // Verify building ownership
    const pgBuilding = await Prisma.pGBuilding.findFirst({
      where: {
        id: parseInt(pgBuildingId),
        ownerId: owner.id,
      },
      select: { id: true },
    });

    if (!pgBuilding) {
      return res.status(404).json({ message: "PG Building not found" });
    }

    // Find the specific cot and check if it's occupied
    const cot = await Prisma.cot.findFirst({
      where: {
        cotNumber: cotNumber,
        room: {
          roomNumber: roomNumber,
          pgBuildingId: parseInt(pgBuildingId),
        },
      },
      select: {
        id: true,
        isOccupied: true,
        status: true,
      },
    });

    if (!cot) {
      return res.status(404).json({ message: "Bed not found" });
    }

    if (cot.isOccupied || cot.status === 'OCCUPIED') {
      return res.status(400).json({ message: "Cannot block an occupied bed" });
    }

    // Update the bed status
    const updatedCot = await Prisma.cot.update({
      where: {
        id: cot.id,
      },
      data: {
        status: isBlocked ? 'BLOCKED' : 'AVAILABLE',
        updatedAt: new Date(),
      },
      select: {
        cotNumber: true,
        isOccupied: true,
        status: true,
        room: {
          select: {
            roomNumber: true,
            floorNumber: true,
          },
        },
      },
    });

    return res.json({
      success: true,
      message: "Bed status updated successfully",
      data: {
        roomNumber: updatedCot.room.roomNumber,
        floorNumber: updatedCot.room.floorNumber,
        cot: {
          cotNumber: updatedCot.cotNumber,
          isOccupied: updatedCot.isOccupied,
          status: updatedCot.status,
        },
      },
    });

  } catch (error) {
    console.error("Error updating bed status:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

exports.fetchOwnerPgs = async (req, res) => {
  try {
    const { userId } = req.user;
    if (!userId) {
      return res.status(404).json({
        success: false,
        message: "User ID not Found",
      });
    }

    const ownerDetails = await Prisma.owner.findFirst({
      where: {
        userId: userId,
      },
    });

    if (!ownerDetails) {
      return res.status(404).json({
        success: false,
        message: "Owner not found",
      });
    }

    const ownerPgs = await Prisma.pGBuilding.findMany({
      where: {
        ownerId: ownerDetails?.id,
      },
    });

    if (!ownerPgs) {
      return res.status(403).json({
        success: false,
        message: "Unable Fetch PGs",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Fetched Data Successfully",
      data: ownerPgs,
    });
  } catch (e) {
    return res.status(400).json({
      success: false,
      message: "Something went wrong",
    });
  }
};


