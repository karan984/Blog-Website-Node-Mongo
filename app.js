const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const articleRouter = require("./routes/articles");
const Article = require("./models/article");
const methodOverride = require("method-override");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/blog", {useNewUrlParser : true});

app.set('view engine', 'ejs');

app.use(express.urlencoded({extended : false})); // this line should be above app.use("/articles") as we use this in it
// put app.use("/articles") at the bottom

app.use(methodOverride('_method'));

app.get("/", async (req, res) => {
    const articles = await Article.find().sort({createdDate : 'desc'});
    res.render('articles/index', {articles : articles});
})

// we need to use router and also specify where it will be based on
app.use("/articles", articleRouter);

app.listen(3000, function(){
    console.log("Server started at port 3000!");
})