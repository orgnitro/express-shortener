// imports start
const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const path = require("path");
const AUTH_ROUTES = require("./routes/auth-routes");
const LINK_ROUTES = require("./routes/link-routes");
const REDIRECT_ROUTES = require("./routes/redirect-routes");
// imports end

// constants start
const MONGO_URI = config.get("mongoUri");
const PORT = process.env.PORT || 5000;
const app = express();
// constants start

app.use(express.json());
app.use("/api/auth", AUTH_ROUTES);
app.use("/api/link", LINK_ROUTES);
app.use("/t/", REDIRECT_ROUTES);

if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));
  
  app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  })
}

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
