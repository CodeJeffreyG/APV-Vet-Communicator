const express = require("express");
const mongoose = require("mongoose");
const messageRoutes = require("./routes/messages");

mongoose.connect;
const app = express();

const port = 5000;

mongoose

  .connect(
    ""
  )

  .then(() => console.log("connected to mongo db database"))
  .catch((err) => console.error(err));

app.use(express.json());

app.use("/api/messages", messageRoutes);

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

app.get("/", (request, response) => {
  response.send("hello world");
});
