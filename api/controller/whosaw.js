const model = require('../model/whosaw');

const WhoSaw = async (res, req) => {
    try{
        const query = await model(req.body);
        res.json({message : query.number}).status(200);
    }
    catch(err){
        res.json({message : "Error on the sevrer-side"}).status(500);
    }
};

module.exports = WhoSaw;
