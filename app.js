const express = require('express');
const {check , validationResult} = require('express-validator');
const cors = require('cors');
const movies = require('./movies.json')
const app = express();

app.use(cors({
    'allowedHeaders':['content-Type'],
    'origin':'*',
    'preflightContinue':true,
    'methods':"GET,POST,DELETE"
}))

app.get('/',(req,res)=>{
    res.json({movies});
})

app.post('/addmovies',
[
    check("movie_name","invalid moviename").not().isEmpty(),
    check("rating","invalid rating").not().isEmpty().isEmpty(),
    check("date","invalid date").not().isEmpty()
],
async(req,res)=>{
    // const errors = validationResult(req);
    // if(!errors.isEmpty()){
    //     const error = errors.array()
    // }
    // const {movie_name , rating , date} = req.body;
    try {
        const Movie = {
            "movie_name":"spider-man No-Way-Home",
            "rating":"5",
            "date":"21.08.21"
        }
        movies.push(Movie)
        console.log(movies);
        res.json({movies});
    } catch (error) {
        res.status(500).send("Internal error occured");
    }
})


app.listen(5000,()=>{
    console.log("server started")
});
