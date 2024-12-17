import express, { request, response } from "express";
import { PORT,mongoDBURL} from "./config.js";
import mongoose from "mongoose";
import booksRoute from './routes/booksRoute.js';
import cors from  'cors'

const app = express();

app.use(express.json()); // for parsing application/json
//Middleware for handling CORS Policy
app.use(cors());
//app.use(cors({
//   origin:'http://localhost:3000',
 //   methods:['GET','POST','PUT','DELETE'],
  //  allowedHeaders:['Content-Type'],
//})
//);
app.get( "/", (request, response) =>{
    console.log(request);
    return response.status(234).send( 'Hello World!' );
});

app.use('/books',booksRoute);


mongoose.connect(mongoDBURL,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(()=>{
    console.log('App connected to database');
    app.listen(PORT,()=>{
        console.log(`App is running to port :${PORT}`);
    });
    
})
.catch((error)=>{
    console.log(error);
});

