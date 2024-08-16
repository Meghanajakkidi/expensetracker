const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const AuthModel = require("../models/Auth");

async function login(req, res) {
    const { email, password } = req.body;
    let isUserExist = await AuthModel.findOne({ email: email });

    if (isUserExist) {
        const isMatch = await bcrypt.compare(password, isUserExist.password);
        if (isMatch) {
            if (isUserExist.active === false) {
                return res.status(403).send({ message: "Your account has been Deactivated", success: false });
            } else {
                let token = jwt.sign({ email: isUserExist.email, _id: isUserExist._id }, "testkey", { expiresIn: '1h' });
                return res.status(200).send({ 
                    message: "User Logged in Successfully", 
                    success: true, 
                    token: token, 
                    email: isUserExist.email, 
                    userId: isUserExist._id, 
                    role: isUserExist.role 
                });
            }
        } else {
            return res.status(401).send({ message: "Invalid credentials", success: false });
        }
    } else {
        return res.status(404).send({ message: "User Not Exist", success: false });
    }
}

module.exports = {
    login
};