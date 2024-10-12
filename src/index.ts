import Koa from "koa";
import bodyParser from "koa-bodyparser";
import recetasRouter from "./endpoints/recetas";
import connectDB from "./bd";
import dotenv from "dotenv";
import cors from "@koa/cors";

dotenv.config();

const app = new Koa();

app.use(cors());
connectDB();

app.use(bodyParser());
app.use(recetasRouter.routes()).use(recetasRouter.allowedMethods());

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor activo en el puerto ${PORT}`);
});
