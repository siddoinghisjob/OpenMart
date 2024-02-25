const model = require('../model/retreqs');

const RetReq = async (res, req) => {
    try{
        const query = model(req.body);
        res.json(query).status(200);
    }
    catch(err){
        res.json({message : "Error on the sevrer-side"}).status(500);
    }
};

module.exports = RetReq;
