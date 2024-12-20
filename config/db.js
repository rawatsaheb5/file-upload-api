const mongoose= require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected with DB successfully !')
    } catch (error) {
        console.log('Failed to connect with DB !');
    }
}

module.exports = connectDB;