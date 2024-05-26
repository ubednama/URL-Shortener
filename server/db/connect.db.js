import mongoose from 'mongoose'

async function connectToMongoDB() {
    return mongoose.connect(process.env.DB_URL).then(()=>console.log('Database connected'))
}

export {
    connectToMongoDB
}