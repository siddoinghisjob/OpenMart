const model = require("../model/fetchprods");

const fetchprods = async (req, res) => {
    try{
        const query = await model();
        res.json({success : true, message : query}).status(200);
    }
    catch(e){
        res.json({success : false}).status(500);
    }
};

module.exports = fetchprods;