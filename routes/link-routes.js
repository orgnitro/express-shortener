const { Router } = require("express");
const Config = require("config");
const ShortId = require("shortid");
const Link = require("../models/Link");
const auth = require("../middleware/auth-middleware");

const router = Router();

router.post("/generate", auth, async (req, res) => {
  const baseUri = Config.get("baseUri");
  const { from } = req.body;
  const code = ShortId.generate();
  let link;
  let existing;
  let to;
  try {
    existing = await Link.findOne({ from });
    if (existing) {
      return res.json({ link: existing });
    }
    to = baseUri + "/t/" + code;
    link = new Link({
      code,
      from,
      to,
      owner: req.user.userId,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      message: "Something went wrong on server. Error code 500",
      error: JSON.stringify(e),
    });
  }
  await link.save();
  res.status(201).json({ link, message: "Link has been successfully created" });
});
router.get("/", auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json(links);
  } catch (e) {
    console.log("ERROR IS: ", e);
    res.status(500).json({
      message: "Something went wrong on server. Error code 500",
      error: JSON.stringify(e),
    });
  }
});
router.get("/:id", auth, async (req, res) => {
  let link;
  try {
    link = await Link.findById(req.params.id);
    res.json(link);
  } catch (e) {
    res.status(500).json({
      message: "Something went wrong on server. Error code 500",
      error: JSON.stringify(e),
    });
  }
});

module.exports = router;
