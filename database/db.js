import mongoose from "mongoose";

const Connection = async (URL) => {
    try {
        await mongoose.connect(URL, { useNewUrlParser: true })
        console.log("Database Connected Successfully")
    } catch (error) {
        console.log("Error while Connecting with the database ", error)
    }
}

export default Connection;