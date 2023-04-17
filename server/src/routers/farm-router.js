const express = require("express");
const farmRouter = new express.Router();
const Farm = require("../models/farm");
const User = require("../models/user");
const Livestock = require("../models/livestock");
const { auth } = require("../middleware/auth");

// Add a new farm
farmRouter.post("/farms", auth, async (req, res) => {
  try {
    const { user } = req;

    const farm = new Farm({ ...req.body, farmers: [user._id] });

    // add farm
    await farm.save();

    user.farmId = farm._id;

    // add farmId to the user
    await user.save();

    const populatedFarm = await Farm.findById(farm._id).populate([
      {
        path: "farmers",
        model: "User",
        select: "-password -tokens -farmId -createdAt -updatedAt -__v", // excluded fields
      },
      {
        path: "livestock",
        model: "Livestock",
      },
    ]);

    const updatedUser = await User.findById(user._id).select(
      "-password -tokens -createdAt -updatedAt -__v"
    );

    console.log("HERE -->", updatedUser);

    res.status(201).json({ user: updatedUser, farm: populatedFarm });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// Read a farm
farmRouter.get("/farms/:id", auth, async (req, res) => {
  const _id = req.params.id;

  console.log(_id);

  try {
    const farm = await Farm.findOne({ _id }).populate([
      {
        path: "farmers",
        model: "User",
        select: "-password -tokens -farmId -createdAt -updatedAt -__v", // excluded fields
      },
      {
        path: "livestock",
        model: "Livestock",
      },
    ]);

    console.log("farm ->", farm);

    res.send(farm);
  } catch (e) {
    res.status(500).send();
  }
});

// Update an existing farm
farmRouter.patch("/farms/:id", auth, async (req, res) => {
  try {
    const farm = await Farm.findById(req.params.id);

    if (farm) {
      farm.name = req.body.name || farm.name;
      farm.address = req.body.address || farm.address;
      farm.phone = req.body.phone || farm.phone;
      farm.email = req.body.email || farm.email;
      farm.farmers = req.body.farmers || farm.farmers;
      farm.livestock = req.body.livestock || farm.livestock;
      await farm.save();
      res.json(farm);
    } else {
      res.status(404).json({ message: "Farm not found" });
    }
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
});

// Add a new livestock to a farm
farmRouter.post("/farms/:id/livestock", auth, async (req, res) => {
  try {
    const farmId = req.params.id;
    // const farm = await Farm.findById(farmId);

    const livestock = new Livestock({ ...req.body });

    // save the new livestock object
    const savedLivestock = await livestock.save();

    // add the ID of the new livestock object to the corresponding farm's livestock array
    const updatedFarm = await Farm.findByIdAndUpdate(
      farmId,
      {
        $push: { livestock: savedLivestock._id },
      },
      { new: true }
    ).populate([
      {
        path: "farmers",
        model: "User",
        select: "-password -tokens -farmId -createdAt -updatedAt -__v", // excluded fields
      },
      {
        path: "livestock",
        model: "Livestock",
      },
    ]);

    res.status(201).json(updatedFarm);

    // farm.livestock.push(livestock);

    // const updatedFarm = await farm.save();

    // res.status(201).json(updatedFarm);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = {
  farmRouter,
};
