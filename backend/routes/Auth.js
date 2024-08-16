const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const multer = require('multer');
const path = require("path");
const mongoose = require("mongoose");
const authController = require("../controllers/Auth");
const AuthModel = require("../models/Auth");

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        const fileName = file.originalname.toLowerCase().split(' ').join('-');
        cb(null, fileName);
    }
});


const upload = multer({ storage: storage });

router.post("/signup", async function (req, res) {
    const { email, password } = req.body;
    let isUserExist = await AuthModel.findOne({ email: email });

    if (isUserExist) {
        return res.status(409).send({ message: "User already exists", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new AuthModel({ ...req.body, password: hashedPassword, active: true });
    await newUser.save();
    res.status(201).send({ message: "User Signup successfully", success: true });
});

router.post("/login", authController.login);

function checkForToken(req, res, next) {
    if (req.headers['authorization']) {
        next();
    } else {
        return res.status(403).send("You don't have access to this route");
    }
}

router.get("/profile/:email", checkForToken, async function (req, res) {
    let user = await AuthModel.findOne({ email: req.params.email });
    res.status(200).send(user);
});

router.get("/users", async function (req, res) {
    let users = await AuthModel.find({});
    res.status(200).send(users);
});

router.put("/changePassword", async function (req, res) {
    const { email, currentPassword, newPassword } = req.body;
    let user = await AuthModel.findOne({ email });

    if (user) {
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (isMatch) {
            user.password = await bcrypt.hash(newPassword, 10);
            await user.save();
            res.status(200).send({ message: "Password updated successfully", success: true });
        } else {
            res.status(401).send({ message: "Current password is incorrect", success: false });
        }
    } else {
        res.status(404).send({ message: "User Not Exist", success: false });
    }
});

router.put("/activate_deactivate", async function (req, res) {
    const { id, active } = req.body;
    const updatedUser = await AuthModel.updateOne({ _id: new mongoose.Types.ObjectId(id) }, { active: active });
    res.status(200).send(updatedUser);
});

router.post("/profileupload/:email", upload.single('profile'), async function (req, res) {
    const updatedUser = await AuthModel.updateOne({ email: req.params.email }, { profilepic: req.file.filename });
    res.status(200).send(updatedUser);
});

module.exports = router;