const express = require("express");
const students = require("./routes/students");
const app = express();
const port = 3500;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("<h1>students api</h1>");
});

app.use("/api/v1/students", students);

app.listen(port, () => {
    console.log(`server running at port ${port}`);
});
