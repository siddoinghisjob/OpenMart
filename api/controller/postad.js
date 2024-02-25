const model = require('../model/postad');

const PostAd = async (req, res) => {
    try{
        const query = await model(req.body, req.files);
        if(query.code) res.json(query).status(400);
        res.json({message : "Posted Ad"}).status(200);
    }
    catch(err){
        res.json({message : "Error on the sevrer-side"}).status(500);
    }
};

module.exports = PostAd;