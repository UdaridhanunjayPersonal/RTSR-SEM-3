const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/dietPlansDB', { useNewUrlParser: true, useUnifiedTopology: true });

const memberSchema = new mongoose.Schema({
    age: Number,
    height: Number,
    weight: Number,
    gender: String,
    exercise: String,
    diet: String,
    disease: String
});

const Member = mongoose.model('Member', memberSchema);

// Seed database with sample data
const seedData = async () => {
    await Member.deleteMany({});
    await Member.insertMany([
        { age: 25, height: 175, weight: 70, gender: "male", exercise: "moderate", diet: "vegetarian", disease: "diabetes" },
        { age: 30, height: 160, weight: 65, gender: "female", exercise: "light", diet: "non-vegetarian", disease: "heart" },
        { age: 45, height: 168, weight: 80, gender: "male", exercise: "heavy", diet: "vegetarian", disease: "hypertension" },
        { age: 35, height: 158, weight: 55, gender: "female", exercise: "none", diet: "non-vegetarian", disease: "obesity" },
        { age: 28, height: 172, weight: 60, gender: "male", exercise: "moderate", diet: "vegetarian", disease: "coeliac" },
        { age: 32, height: 165, weight: 68, gender: "female", exercise: "light", diet: "vegetarian", disease: "diabetes" },
        { age: 29, height: 180, weight: 85, gender: "male", exercise: "very-heavy", diet: "non-vegetarian", disease: "heart" },
        { age: 40, height: 170, weight: 75, gender: "female", exercise: "heavy", diet: "non-vegetarian", disease: "hypertension" },
        { age: 22, height: 160, weight: 50, gender: "male", exercise: "light", diet: "vegetarian", disease: "obesity" },
        { age: 50, height: 162, weight: 70, gender: "female", exercise: "none", diet: "non-vegetarian", disease: "coeliac" },
    ]);
};

seedData();

// API endpoint to get member details
app.post('/api/diet-plan', async (req, res) => {
    const { age, height, weight, gender, exercise, diet, disease } = req.body;
    const member = await Member.findOne({ age, height, weight, gender, exercise, diet, disease });

    if (member) {
        res.json({ dietPlan: `Member details - Age: ${member.age}, Height: ${member.height} cm, Weight: ${member.weight} kg, Gender: ${member.gender}, Exercise: ${member.exercise}, Diet: ${member.diet}, Disease: ${member.disease}` });
    } else {
        res.json({ dietPlan: 'No matching member found' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
