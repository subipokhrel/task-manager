// Import bcrypt for password hashing and jwt for token generation
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User"); // Import the User model

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body; // Destructure incoming data from the request body

    // Check if the email is already registered
    // const existingUser = await User.findOne({ where: { email } });
    // if (existingUser) return res.status(400).json({ message: 'Email already in use' });

    // Hash the user's password before storing it (10 salt rounds)
    const hash = await bcrypt.hash(password, 10);

    // Create and save the new user with the hashed password
    const user = await User.create({ username, email, password: hash });

    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    // Destructure email and password from request body
    const { email, password } = req.body;

    // Find the user in the database by email
    const user = await User.findOne({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: "Invalid credentials" }); // 401 = Unauthorized
    }

    // Generate a JWT token using the user's ID as the payload
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // Send the token as an HTTP-only cookie (not accessible from frontend JS)
    res
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "None",
        maxAge: 24 * 60 * 60 * 1000,
      }) // Helps prevent XSS attacks
      .json({ message: "Login successful" });
  } catch (error) {
    // Catch and send any errors during login
    res.status(400).json({ error: error.message });
  }
};
