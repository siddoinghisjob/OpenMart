const model = require('../model/retads');

const RetAd = async (res, req) => {
    try{
        const query = model(req.body);
        res.json({data : query.data}).status(200);
    }
    catch(err){
        res.json({message : "Error on the sevrer-side"}).status(500);
    }
};

module.exports = RetAd;