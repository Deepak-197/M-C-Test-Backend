const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
// const { default: mongoose } = require("mongoose");
const {connection, candidateModel} = require("./model/db");



// load environment variable
dotenv.config({override:true});

// initialize express
const app = express();

// middleware to parse JSON
app.use(express.json());
app.use(cors());

app.get("/candidate", async(req, res) => {
    try{
        const candidates = await candidateModel.find();
        res.send(candidates)
    }catch(err){
        res.send({"msg":"Cannot get user.", "error":err.message})
    }
    res.send("WELCOME")
})

// app.get("/candidate", async(req, res) => {
//     let query = req.query

//     try{
//         const candidates = await candidateModel.find(query)
//         res.send(candidates)
//     }catch(err){
//         res.send({"msg":"Cannot get user.", "error":err.message})
//     }
// })


app.post("/submit", async(req, res) => {
    console.log(req.body)
    try{
        const candidate = new candidateModel(req.body)
        await candidate.save()

        res.send({"msg":"Candidate record submitted."})

        

    }catch(err){
        res.send({"msg":"Not Submitted.", "error":err.message})
    }
})


app.listen(process.env.port, async() =>{

    try{
        await connection
        console.log("Connected to the DB");
    }
    catch(err){
        console.log("Cannot Connect to the DB");
       
        console.log(err)
    }

    console.log(`Server is running at port ${process.env.port}`)
})