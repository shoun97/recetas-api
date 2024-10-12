import Router from "koa-router";
import RecetaModel from "../models/recetaModel";
import { isValidObjectId } from "mongoose";

const router = new Router();

router.get("/api/recetas", async (ctx) => {
  const pageParam = ctx.query.page || "1";
  const limitParam = ctx.query.limit || "100";

  const page = parseInt(pageParam as string);
  const limit = parseInt(limitParam as string);

  const skip = (page - 1) * limit;

  try {
    const recetas = await RecetaModel.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const totalRecetas = await RecetaModel.countDocuments();

    const totalPages = Math.ceil(totalRecetas / limit);

    ctx.body = {
      totalRecetas,
      totalPages,
      currentPage: page,
      recetas,
    };
  } catch (error) {
    ctx.status = 500;
    ctx.body = { error: "Error al recuperar las recetas" };
  }
});

router.get("/api/receta/:id", async (ctx) => {
  const receta = await RecetaModel.findById(ctx.params.id);

  if (receta) {
    ctx.body = receta;
  } else {
    ctx.status = 404;
    ctx.body = { error: "Receta no encontrada" };
  }
});

router.post("/api/recetas", async (ctx) => {
  const nuevaReceta = new RecetaModel(ctx.request.body);
  try {
    await nuevaReceta.validate();
    await nuevaReceta.save();
    ctx.status = 201; // Creado
    ctx.body = nuevaReceta;
  } catch (error) {
    const typoError = error as Error;
    ctx.status = 400;
    ctx.body = {
      //@ts-ignore
      error: typoError.message || "Error al crear la receta",
      //@ts-ignore
      validationErrors: typoError.errors || null,
    };
  }
});

interface RecetaUpdate {
  nombre?: string;
  descripcion?: string;
  imagenUrl?: string;
  ingredientes?: string[];
  instrucciones?: string;
  tiempoPreparacion?: number;
  dificultad?: string;
  participante?: string;
}

router.put("/api/receta/:id", async (ctx) => {
  const { id } = ctx.params;

  if (!isValidObjectId(id)) {
    ctx.status = 400;
    ctx.body = { error: "ID de receta no válido" };
    return;
  }

  try {
    const body: RecetaUpdate = ctx.request.body as RecetaUpdate;
    const updatedReceta = await RecetaModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (updatedReceta) {
      ctx.body = updatedReceta;
    } else {
      ctx.status = 404;
      ctx.body = { error: "Receta no encontrada" };
    }
  } catch (error) {
    const typoError = error as Error;

    if (typoError.name === "ValidationError") {
      ctx.status = 400;
      ctx.body = { error: typoError.message };
    } else {
      ctx.status = 500;
      ctx.body = { error: "Error interno del servidor" };
    }
  }
});

router.delete("/api/receta/:id", async (ctx) => {
  const result = await RecetaModel.findByIdAndDelete(ctx.params.id);

  if (result) {
    ctx.status = 204;
  } else {
    ctx.status = 404;
    ctx.body = { error: "Receta no encontrada" };
  }
});

router.post("/api/recetas/:id/:voto", async (ctx) => {
  const { id, voto } = ctx.params;
  const receta = await RecetaModel.findById(id);

  if (receta) {
    const valorVoto = parseInt(voto);
    if (valorVoto === 1) {
      receta.votos += 1;
    } else if (valorVoto === 0) {
      receta.votos -= 2;
    }

    await receta.save();
    ctx.body = { id: receta.id, votos: receta.votos };
  } else {
    ctx.status = 404;
    ctx.body = { error: "Receta no encontrada" };
  }
});

export default router;
