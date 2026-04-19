import mongoose from "mongoose";

try {
  mongoose.connect(process.env.MONGO_DB).then(() => {
    console.info("Conectado a la base de datos");
  });
} catch (error) {
  console.error(error);
}

export default mongoose;
