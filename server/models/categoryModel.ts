import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Por gentileza, insira uma categoria a ser criada."],
      trim: true,
      unique: true,
      maxLength: [50, "Insira uma cateforia de no máximo 50 caracteres."],
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("category", categorySchema);
