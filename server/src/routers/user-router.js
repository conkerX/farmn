const express = require("express");
const userRouter = new express.Router();
const User = require("../models/user");
const { auth } = require("../middleware/auth");
const multer = require("multer");
const sharp = require("sharp");

/* Create a new user */
userRouter.post("/users", async (req, res) => {
  const user = new User(req.body);

  console.log(user);

  try {
    await user.save();

    const token = await user.generateAuthToken();

    res.status(201).send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

/* User Login */
userRouter.post("/users/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByCredentials(email, password);
    const token = await user.generateAuthToken();

    console.log(user);

    res.send({ user, token });
  } catch (e) {
    res.status(400).send(e);
  }
});

/* User Logout */
userRouter.post("/users/logout", auth, async (req, res) => {
  try {
    console.log("1", req.user);

    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });

    await req.user.save();

    console.log("2");
    res.send();
  } catch (e) {
    res.status(500).send(e);
  }
});

/* User Logout of all sessions */
userRouter.post("/users/logoutall", auth, async (req, res) => {
  try {
    req.user.tokens = [];

    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send();
  }
});

/* Get user profile */
userRouter.get("/users/me", auth, async (req, res) => {
  res.send(req.user);
});

/* Update user profile */
userRouter.patch("/users/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["username", "email", "password", "farmId"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  console.log(updates);

  if (!isValidOperation) {
    return res.status(400).send({
      error:
        "Invalid request - One or more properties does not exist and therefore cannot be updated.",
    });
  }

  try {
    const { user } = req;

    updates.forEach((update) => {
      user[update] = req.body[update];
    });

    await user.save();

    res.send(user);
  } catch (e) {
    res.status(500).send(e);
  }
});

/* Delete user profile */
userRouter.delete("/users/me", auth, async (req, res) => {
  try {
    req.user.remove();

    res.send(req.user);
  } catch (e) {
    res.status(500).send();
  }
});

/* Upload Avatar */
const upload = multer({
  limits: {
    fileSize: 1000000, // number in bytes
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      cb(new Error("Please upload an image"));
    }

    cb(undefined, true);
  },
});

userRouter.post(
  "/users/me/avatar",
  auth,
  upload.single("avatar"),
  async (req, res) => {
    const buffer = await sharp(req.file.buffer)
      .resize({ width: 250, height: 250 })
      .png()
      .toBuffer();

    req.user.avatar = buffer;

    await req.user.save();

    res.send();
  },
  (error, req, res, next) => {
    res.status(400).send({ error: error.message });
  }
);

/* Delete Avatar */
userRouter.delete("/users/me/avatar", auth, async (req, res) => {
  req.user.avatar = undefined;
  await req.user.save();
  res.send();
});

userRouter.get("/users/:id/avatar", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user || !user.avatar) {
      throw new Error();
    }

    res.set("Content-Type", "image/jpg");
    res.send(user.avatar);
  } catch (e) {
    res.status(404).send();
  }
});

module.exports = {
  userRouter,
};
