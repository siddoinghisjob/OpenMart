const model = require('../model/postreq');

const PostReq = async (req, res) => {
    try{
        await model(req.body);
        res.json({message : "Posted Request"}).status(200);
    }
    catch(err){
        res.json({message : "Error on the sevrer-side"}).status(500);
    }
};

module.exports = PostReq;
