import mongoose from 'mongoose'

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL);
    console.log("Connected to MongoDB.");
  } catch (error) {
    console.log(error);
  }
}

export default connectMongo;

// import mongoose from 'mongoose';

// const connectMongo = async () => {
//   if (mongoose.connections[0].readyState) {
//     return;
//   }
//   await mongoose.connect(process.env.MONGODB_URL);
// };

// export default connectMongo;