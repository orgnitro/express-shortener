// imports start
const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
// imports end

// constants start
const MONGO_URI = config.get("mongoUri");
const PORT = config.get("port") || 5000;
const AUTH_ROUTE = require("./routes/auth.routes");
const app = express();
// constants start

app.use("/api/auth", AUTH_ROUTE);

async function start() {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`app has been started on port ${PORT}`));
  } catch (e) {
    console.log("Server Error", e.message);
    process.exit(1);
  }
}

start();
