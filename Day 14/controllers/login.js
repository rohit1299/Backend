const User = require("../models/User");
const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({
      where: {
        email: email,
      },
    });

    const userId = user.dataValues.id;
    const role = user.dataValues.role;

    const token = jwt.sign(
      { userId: userId, email: email },
      process.env.SECRET_KEY,
      {
        expiresIn: "1h",
      }
    );

    switch (role) {
      case "admin":
        return res.status(200).json({ message: "Welcome Admin", user, token });
      case "superAdmin":
        return res
          .status(200)
          .json({ message: "Welcome Super Admin", user, token });

      default:
        return res.status(200).json({ message: "Welcome User", user });
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = login;
