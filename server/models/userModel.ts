import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Nome obrigatorio."],
      trim: true,
      maxLength: [30, "Seu nome ultrapassou o limite de 30 caracteres."],
    },
    account: {
      type: String,
      required: [true, "Obrigatorio adicionar E-mail ou telefone para acesso."],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Obrigatorio adicionar senha para acesso."],
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png",
    },
    role: {
      type: String,
      default: "user",
    },
    type: {
      type: String,
      default: "normal",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", userSchema);
