const express = require("express");
const path = require('path');
const cookieParser = require("cookie-parser");
const {connetToMongoDB} = require("./conntection/connet");
const {checkForAuthentication,restrictTo} = require ('./middleware/auth');
const URL = require('./models/url');


const urlRoute = require("./routes/url");
const StaticRoute = require("./routes/StaticRouter");
const userRoute = require('./routes/user');


const app = express();
const PORT = 8001;


connetToMongoDB('mongodb://localhost:27017/short-url')
.then(() => console.log("MongoDB connected"));

app.set("view engine","ejs");
app.set('views',path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthentication);

app.use("/url", restrictTo(["NORMAL","ADMIN"]),urlRoute);
app.use('/' ,StaticRoute);
app.use('/user',userRoute);

app.get("/test", async(req,res)=>{
    const allUrls = await URL.find({});
    return res.render("home",{
        urls: allUrls
    });
});

app.get('/url/:shortId',async(req,res)=>{
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortId,
    },
    {
        $push:{
        visitHistrory: { timestamp: Date.now()}
    },
});
res.redirect(entry.redirectUrl);
});


app.listen(PORT,() => console.log(`Server started at post: ${PORT}`));