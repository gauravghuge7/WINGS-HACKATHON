import mongoose from 'mongoose';


const mongoConnection = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/hackthon', {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.log(err);
  }
};

export default mongoConnection;