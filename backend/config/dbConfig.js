import mongoose from 'mongoose';

const dbConfig = () => {
    // Connect to the database 
    mongoose.connect(process.env.MONGODB_CLOUD).then(conn => console.log(`Database connected successfully with ${conn.connection.host}.`)).catch(err => console.log(`Database connection failed because ${err.message}`))
};

export default dbConfig;