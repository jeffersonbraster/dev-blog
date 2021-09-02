import mongoose from "mongoose";

const URI = process.env.MONGODB_URL;

mongoose.connect(
  `${URI}`,
  {
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) throw err;
    console.log("mongodb connected");
  }
);
