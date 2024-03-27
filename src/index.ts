import  express, { NextFunction, Request, Response }  from "express";
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import swaggerDoc from '../docs/swagger.json'
import routes from "./routes/routes";
import HttpException from "./utils/http-exception";
require('dotenv').config();


// MIDDLEWARE
const app=express();
app.use(cors());
app.use(express.json());

app.use('/api',routes)
app.use(express.static('public'));

app.get('/',(req:Request,res:Response)=>{
    res.json({status:'API is running'})
})

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDoc))

/* eslint-disable */
app.use((err: Error | HttpException, req: Request, res: Response, next: NextFunction) => {
  let statusCode = 500; // Default status code for internal server error
  let errorMessage: string | any = 'Internal Server Errors';
  console.log(err)
  
  if (err instanceof HttpException) {
      statusCode = err.errorCode; // If it's an HttpException, set status code from errorCode property
      errorMessage = err.message; // Set the error message from the HttpException
  }
  

  res.status(statusCode).json({ error: errorMessage }); // Sending error message along with status code
});
  
//start the server
app.listen(process.env.PORT || 8000,()=>{
    console.log(`server running on ${process.env.PORT}`)
})




