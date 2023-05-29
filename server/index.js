import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Sequelize, DataTypes } from "sequelize";

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.USER_NAME,
    process.env.USER_PASS ?? null,
    {
        host: process.env.HOST,
        dialect: process.env.DATABASE_TYPE,
        logging: (() => {
            if (process.env.IS_LOG) {
                if (process.env.IS_LOG.toLowerCase() == "true") {
                    return true;
                }
                else {
                    return false;
                }
            }
            return false;
        })(),
        timezone: process.env.TIME_ZONE
    }
);

const wait = (ms) => new Promise(e => setTimeout(e, ms));

try {
    await sequelize.authenticate();
    console.log("Connect to database success!");
} catch (error) {
    await ((ms) => new Promise(e => setTimeout(e, ms)))(3000);
    try {
        await sequelize.authenticate();
        console.log("Connect to database success!");
    } catch (error) {
        await ((ms) => new Promise(e => setTimeout(e, ms)))(3000);
        try {
            await sequelize.authenticate();
            console.log("Connect to database success!");
        } catch (error) {
            console.log(error);
        }
    }
}

const User = sequelize.define('user', {
    userId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING
    }
});

await sequelize.sync({
    force: false,
    alter: true
});

const app = express();

const PORT = process.env.PORT || 6001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static("./"));

app.get("/", async (req, res) => {

    return res.status(200).json({
        // result: "success",
        message: "Hello World",
        "widget": {
            "debug": "on",
            "window": {
                "title": "Sample Konfabulator Widget",
                "name": "main_window",
                "width": 500,
                "height": 500
            },
            "image": {
                "src": "Images/Sun.png",
                "name": "sun1",
                "hOffset": 250,
                "vOffset": 250,
                "alignment": "center"
            },
            "text": {
                "data": "Click Here",
                "size": 36,
                "style": "bold",
                "name": "text1",
                "hOffset": 250,
                "vOffset": 100,
                "alignment": "center",
                "onMouseUp": "sun1.opacity = (sun1.opacity / 100) * 90;"
            }
        }
    });
});

app.get('/api/users', async (req, res) => {

    const users = await User.findAll();
    return res.status(200).json({
        result: "success",
        users
    });
});

app.get('/api/user/create', async (req, res) => {
    const { name } = req.query;
    const user = await User.create({
        name
    });
    return res.status(200).json({
        result: "success",
        user
    });
})


app.listen(PORT, () => {
    console.log("Server is running at port:", PORT);
});