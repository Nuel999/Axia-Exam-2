const userModels = require ("../models/userModel")
const bcrypt = require ("bcryptjs")

const createUser = async (req, res) => {
    const {email, password, ...other } = req.body;

    if (!email || !password) {
        return res.send ("Kindly provide valid details")
    }

    const userExist = await userModels.findOne({email});
    if (userExist) {
        return res.send ("User exists, Kindly login")
    }

    try {
        const newUser = new userModels({email, password, ...other});
        const savedUser = await newUser.save();
        return res.json(savedUser);
        
    } catch (error) {
        return res.send("There is an issue in your create student")
    }


};

const loginUser = async (req, res) => {
    const {email, password} = req.body;

    // get user
    const user = await userModels.findOne({email});
    if (!user) {
        return res.send("User does not exit!")
    }

    // compare password
    const userValid = bcrypt.compareSync(password, user.password);

    // Create token
    const token = jwt.sign({id: user.id, admin: user.admin}, process.env.JWT_SECRET, { expiresIn: "2hr"});
    console.log(token);
    return res.cookie("token", token, {
        maxAge: 1000 * 60 * 60,
        secure: true,
        httpOnly: true,
    }).json({message: "Successful"})
};

const getUser = async (req, res) => {
    const gettingUser = await userModels.find();
    return res.json(gettingUser);
};

const updateUser = async (req, res) => {
    const {id, ...others } = req.body;
    const updated = await userModels.findByIdAndUpdate(id,
        {...others}, {new: true});
    return res.json(updated);
};

const deleteUser = async (req, res) => {
    const {id} = req.body;
    const deleted = await userModels.findByIdAndDelete(id);
    return res.json(deleted);
};

module.exports = {createUser, loginUser, getUser, updateUser, deleteUser};



