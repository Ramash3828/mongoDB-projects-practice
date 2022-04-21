const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

// use middleware
app.use(cors());
app.use(express.json());
/**
userName : dbuser
password: Ff9yr2vuCy7negjp
*/

const uri =
    "mongodb+srv://dbuser:Ff9yr2vuCy7negjp@cluster0.8pdfz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

async function run() {
    try {
        await client.connect();
        const userCollection = client.db("userExpress").collection("user");
        const user = { name: "partho", email: "partho@gmail.com" };
        const result = await userCollection.insertOne(user);
        console.log(
            `A document was inserted with the _id: ${result.insertedId}`
        );
    } finally {
        await client.close();
    }
}

run().catch(console.dir);

app.get("/", (req, res) => {
    res.send("My project is running now");
});

app.listen(port, () => {
    console.log("Running port" + port);
});
