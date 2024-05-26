import express from 'express';
import dotenv from 'dotenv';
import urlRoutes from './server/routes/url.js';
import infoRoute from './server/routes/info.js'
import { connectToMongoDB } from './server/db/connect.db.js';

dotenv.config()

const app = express()
app.use(express.json())

const PORT = process.env.PORT

connectToMongoDB()
// .then(()=>console.log('Database is connected successfully'))

app.use('/', urlRoutes)
app.use('/info', infoRoute)

app.listen(PORT, ()=> {console.log(`server started at Port ${PORT}`)})