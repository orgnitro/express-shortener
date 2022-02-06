const { Router } = require("express");
const Config = require("config");
const ShortId = require("shortid");
const { Link } = require("../models/Link");
const auth = require("../middleware/auth-middleware");

const router = Router();

router.post("/generate", auth, async (req, res) => {
  const baseUri = Config.get("baseUri");
  const { from } = req.body;
  const code = ShortId.generate();
  let existing;
  let to;
  try {
    existing = await Link.findOne({ from });
    to = baseUri + "/t/" + code;
    const link = new Link({
      code,
      from,
      to,
      owner: req.user.userId,
    });
    if (existing) {
      return res.json({ link: existing });
    }
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong on server. Error code 500" });
  }
});
router.get("/", auth, async (req, res) => {
  try {
    const links = await Link.find({ owner: req.user.userId });
    res.json(links);
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong on server. Error code 500" });
  }
});
router.get("/:id", auth, async (req, res) => {
  try {
    const links = await Link.findById({ owner: req.params.id });
  } catch (e) {
    res
      .status(500)
      .json({ message: "Something went wrong on server. Error code 500" });
  }
});

module.exports = router;
