const db = require("../model/fdetails.js");

const fetchAds = async (req, res) => {
  const model = db.fetchAds;
  try {
    const query = await model(req.params.id);
    res.status(200).json({ message: query, success: true });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error on the sevrer-side", success: false });
  }
};

const fetchReqs = async (req, res) => {
  try {
    const model = db.fetchReqs;
    const query = await model(req.query.id);
    res.status(200).json({ message: query, success: true });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error on the sevrer-side", success: false });
  }
};
module.exports = { fetchAds, fetchReqs };
