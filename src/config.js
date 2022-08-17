import dotenv from "dotenv";
dotenv.config();

export default {
  mongodb: {
    cnxStr: process.env.MONGODB_URL,
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    },
  },
};
