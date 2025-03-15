//npm install express 
 //npm install joi - to validate request data 
// npm install cors - CORS (Cross-Origin Resource Sharing) is a security mechanism that restricts web applications from making requests to a different domain.
const express = require("express");
const Joi = require("joi");
const cors = require("cors");

const app = express();
app.use(express.json()); // Middleware to parse JSON
app.use(cors());

const PORT = 5000;

// Joi schema for validation
const userSchema = Joi.object({
    name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

const userSchemas = Joi.object({
    name: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().pattern(new RegExp("^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{6,}$"))
        .required()
        .messages({
            "string.pattern.base": "Password must contain at least one letter and one number.",
        }),
    age: Joi.number().integer().min(18).required(),
});




// Route to handle user registration
app.post("/register", (req, res) => {
    const { error } = userSchema.validate(req.body);

    if (error) {
        return res.status(400).json({ error: error.details[0].message });
    }

    res.json({ message: "User registered successfully!" });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


// app.get("/", (req, res) => {
    res.send("CORS is enabled!");
//});


