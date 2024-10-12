import mongoose, { Schema, Document } from "mongoose";

export interface Receta extends Document {
  id: number;
  nombre: string;
  descripcion: string;
  ingredientes: string[];
  instrucciones: string;
  tiempoPreparacion: number;
  dificultad: string;
  participante: string;
  votos: number;
  url?: string;
}

const recetaSchema: Schema = new Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es obligatorio"],
    minlength: [3, "El nombre debe tener al menos 3 caracteres"],
    maxlength: [100, "El nombre no puede tener más de 100 caracteres"],
  },
  descripcion: {
    type: String,
    required: [true, "La descripción es obligatoria"],
    minlength: [10, "La descripción debe tener al menos 10 caracteres"],
  },
  ingredientes: {
    type: [String],
    required: [true, "Los ingredientes son obligatorios"],
    validate: {
      validator: function (v: string[]) {
        return v.length > 0;
      },
      message: "Debe haber al menos un ingrediente",
    },
  },
  instrucciones: {
    type: String,
    required: [true, "Las instrucciones son obligatorias"],
    minlength: [20, "Las instrucciones deben tener al menos 20 caracteres"],
  },
  tiempoPreparacion: {
    type: Number,
    required: [true, "El tiempo de preparación es obligatorio"],
    min: [1, "El tiempo de preparación debe ser al menos 1 minuto"],
  },
  dificultad: {
    type: String,
    enum: {
      values: ["baja", "media", "alta"],
      message: "La dificultad debe ser baja, media o alta",
    },
    required: [true, "La dificultad es obligatoria"],
  },
  participante: {
    type: String,
    required: [true, "El nombre del chef es obligatorio"],
  },
  votos: {
    type: Number,
    default: 0,
  },
  url: {
    type: String,
    default: "https://placehold.co/600x400",
    validate: {
      validator: function (v: string) {
        return /^https?:\/\/.*$/.test(v);
      },
      message: "La URL debe ser válida",
    },
  },
});

const RecetaModel = mongoose.model<Receta>("Receta", recetaSchema);

export default RecetaModel;
