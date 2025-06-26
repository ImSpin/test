const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.post("/alert", (req, res) => {
  const message = req.body.message;
  if (message) {
    io.emit("discord-alert", message);
    res.status(200).send("Alert sent");
  } else {
    res.status(400).send("No message provided");
  }
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

io.on("connection", (socket) => {
  console.log("Client connected");
});

const PORT = process.env.PORT || 3000;
http.listen(PORT, () => console.log(`Server running on port ${PORT}`));
