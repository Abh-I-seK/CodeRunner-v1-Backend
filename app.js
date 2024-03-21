import express from "express";
import { getAllCodes, getCodeById, insertNewCode } from "./index.js";
const app = express();
import bodyParser from 'body-parser';
import cors from "cors"
app.use(bodyParser.json());

app.use(cors({
    origin: 'https://code-runner-frontend-gamma.vercel.app'
}));

app.get("/codes" , async(req , res) => {
    try{
        const codes = await getAllCodes();
        res.send(codes[0]);
    }catch{
        res.status(400);
    }
});

app.get("/codes/:id" , async(req , res) => {
    try{
        const id = parseInt(req.params.id);
        const code = await getCodeById(id);
        res.send(code[0]);
    }catch{
        res.status(400);
    }
});

app.post("/newCode" , async(req , res) => {
    try{
    const {username , srcCode , stdinp , lang , stdout, status} = req.body;
    const k = await insertNewCode(username , srcCode , stdinp , lang , stdout , status);
    if(k == -1){
        res.sendStatus(400);
    }
    res.send("Done !");
    }catch{
        res.sendStatus(400);
    }
});

app.use((err , req , res, next) => {
    console.error(err.stack);
    res.status(500).send("Something Broke !");
});

app.listen(8080 , ()=>{
    console.log("Server is Running !!");
});