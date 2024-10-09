const shortid = require("shortid");
const URL = require("../models/url");

async function handelGenerateNewShortUrl(req,res) {
    
    const body = req.body;
    if(!body.url){ return res.status(400).json({error:"Bad request"});
    }
    const shortID = shortid();
    await URL.create({
        shortId: shortID,
        redirectUrl : body.url,
        visitHistrory:[],
        createdBy: req.user._id,
    });
    return res.render("home",{id:shortID});

};

async function getAnalytics(req,res) {
    const shortId  = req.params.shortId;
    const result = await URL.findOne({shortId});
    return res.json({
        totalClicks:result.visitHistrory.length,
        analytics: result.visitHistrory
    });
}
module.exports = { 
    handelGenerateNewShortUrl,
    getAnalytics
};