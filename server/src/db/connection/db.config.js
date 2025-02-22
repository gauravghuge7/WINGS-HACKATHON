import mongoose from 'mongoose';



const connectDB = async () => {

    try {

        const conn = await mongoose.connect(process.env.MONGODB_URI);
        
        console.log(` Mongo DB User Connected Successfully 😎 ${conn.connection.host}`);

    } 
    catch(err) {
        console.log(err);
        process.exit(1);
    }

}
export default connectDB;