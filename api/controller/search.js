const model = require('../model/search');

const Search = async (req, res) => {
    try{
        const query = await model(req.query);
        res.status(200).json({message : query, success : true});
    }
    catch(err){
        res.status(500).json({message : "Error on the sevrer-side", success : false});
    }
};

module.exports = Search;
