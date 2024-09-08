const Express = require("express");
const mongoose = require("mongoose");
const App = Express();
const connectdb = require("./db/mongoConnection");
const User = require("./db/user");
const cors = require("cors");
const jwt = require("jsonwebtoken"); 
const AuthenticateToken = require("./Middleware/AuthenticateToken");
const port = 8000;

connectdb();

App.use(Express.json());
App.use(cors());

App.post('/register', async (req, res) => {
    try {
        const { username, password, email } = req.body;

        const existinguser = await User.findOne({ username }); // Await the result
        if (existinguser) {
            return res.status(400).json({ message: "Username already taken, try other options" });
        }

        const user = new User({ username, password, email }); 
        await user.save();
        res.status(201).json({ message: "Successfully registered!" });

    } catch (error) {
        res.status(500).json({ message: "Registration Failed!", error: error.message });
    }
});

App.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const existinguser = await User.findOne({ username }); 

        if (!existinguser) {
            return res.status(401).json({ error: "Username or password not matched, try again!" });
        }

        if (password === existinguser.password) {
            const payload = { id: existinguser._id }; 
            const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '10s' });

            return res.status(200).json({ message: `Welcome ${username}`, token: token });
        } else {
            return res.status(401).json({ error: "Username or password not matched" });
        }

    } catch (error) {
        res.status(500).json({ error: "Server Error: " + error.message });
    }
});

App.get("/profile", AuthenticateToken, async(req, res) => {

    try{
        const userid=req.user._id;
        const user= await User.findOne(userid);
    
        if(!user){
            res.status(404).json({message:"User not found"});
        }
    
        res.status(200).json(user);
    }
   
    catch(error){
        res.status(500).json({error:"Something went wrong"})
    }
});

App.listen(port, () => {
    console.log(`Server running on ${port}`);
});
