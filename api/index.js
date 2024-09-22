import db from './src/config/db.js'
import express from 'express'
import dotenv from 'dotenv'
import morgan from 'morgan'
import userRouter from './src/routes/userRoutes.js'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import productRouter from "./src//routes/productRouter.js"

//Initialization
dotenv.config()

const allowedOrigins = [process.env.FRONTEND_URL, 'http://localhost:5173']
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., mobile apps, Postman)
    if (!origin) return callback(null, true);

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true); // If origin is in the allowed list
    } else {
      callback(new Error('Not allowed by CORS')); // If origin is not allowed
    }
  },
  credentials: true,
};
db();
const app = express()
app.use(morgan('dev'))
app.use(express.json())

app.use(cors(corsOptions))
app.use(cookieParser())
app.use('/api/users', userRouter);
app.use('/api/products', productRouter);


const PORT = process.env.PORT || 5000;
// Server listening

app.listen(PORT, () => {
  console.log(`Foodtrove app listening on port ${PORT}`)
})

export default app
