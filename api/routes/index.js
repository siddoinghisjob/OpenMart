const DelAd = require("../controller/deletead");
const DelReq = require("../controller/deletereq");
const PostAd = require("../controller/postad");
const PostReq = require("../controller/postrequest");
const RetAd = require("../controller/retriveads");
const RetReq = require("../controller/retrivereqs");
const FetchProds = require("../controller/fetchprods");
const Search = require("../controller/search");
const WhoSaw = require("../controller/whosaw");
const upload = require("../middleware/multer");
const { fetchAds, fetchReqs } = require("../controller/fetchDetails");
const validateFields = require("../middleware/postad");

const router = require("express").Router();

router.get("/search", Search);
router.get("/fetchproducts", FetchProds);
router.get("/number", WhoSaw);
router.post("/ad", validateFields, upload, PostAd);
router.post("/req", validateFields, PostReq);
router.get("/ad", RetAd);
router.get("/req", RetReq);
router.delete("/ad", DelAd);
router.delete("/req", DelReq);

router.get("/ad/:id", fetchAds);
router.get("/req/:id", fetchReqs);

module.exports = router;
