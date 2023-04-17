import express from "express";
import cors from "cors";
import Connection from "./database/db.js";
import Router from "./routes/route.js";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json({ extented: true }))
app.use(express.urlencoded({ extended: true }))

app.use('/', Router);


if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
}

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running successfully on PORT ${PORT}`)
})


const USERNAME = process.env.DB_USERNAME;
const PASSWORD = process.env.DB_PASSWORD;

const URL = process.env.MONGODB_URI || `mongodb://${USERNAME}:${PASSWORD}@ac-jljcrg7-shard-00-00.xxeooo9.mongodb.net:27017,ac-jljcrg7-shard-00-01.xxeooo9.mongodb.net:27017,ac-jljcrg7-shard-00-02.xxeooo9.mongodb.net:27017/?ssl=true&replicaSet=atlas-qnw81n-shard-0&authSource=admin&retryWrites=true&w=majority`;

Connection(URL);