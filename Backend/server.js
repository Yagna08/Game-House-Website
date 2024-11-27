const express = require('express');
const mongoose = require('mongoose');
const validator = require('validator')
const bodyParser = require('body-parser');
require('dotenv').config()
const cors = require('cors')
const app = express();
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST'],       // Specify allowed methods
    credentials: true               // Include credentials if necessary
}));
app.use(bodyParser.json());
mongoose.connect(process.env.MONGODB).then(() => { console.log('Mongo DB is connected') });
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'name is require']
    },
    email: {
        type: String,
        required: [true, 'email is require'],
        validate(val) {
            if (!validator.isEmail(val)) {
                throw new Error("Enter valid email")
            }
        }
    },
    password: {
        type: String,
        required: [true, 'password is require'],
    },
});
const User = mongoose.model('User', UserSchema);

app.post('/api/user/login', async (req, res) => {

    try {
        const { email, password } = req.body;
        console.log(email,password)
        const user = await User.find({ email });
        console.log(user)
        if (!user) {
            console.log(user)
            return res.status(401).json({ error: 'User not found.' });
        }
        if (password !== user[0].password ) {
            console.log(user)
            return res.status(401).json({ error: 'Invalid password.' });
        }
        
        res.status(200).json({ message: 'Login successful.', success: true, userid:user[0]._id , username:user[0].username});
    } catch (error) {
        res.status(500).json({ error: 'An error occurred.' });
    }
});

app.post('/api/user/signup', async (req, res) => {
    try {
        
        const { username, email, password } = req.body;
        console.log(username,email,password)
        const newUser = new User({ username, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User signed up successfully.' ,success:true});
    } catch (error) {
        res.status(500).json({ error: 'An error occurred.', success: false });
    }
});

const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });
module.exports = app;