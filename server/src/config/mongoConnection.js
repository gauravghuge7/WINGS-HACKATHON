import mongoose from 'mongoose';


const mongoConnection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/hackthon");
    console.log('MongoDB Connected');
  } 
  catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default mongoConnection;