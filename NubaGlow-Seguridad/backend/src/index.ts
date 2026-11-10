import express from "express";
import cors from "cors";
import path from "path";
import fs from "fs";
import "./db/database";
import authRoutes from "./routes/auth";
import usuariosRoutes from "./routes/usuarios";

const app = express();
app.use(cors());
app.use(express.json());

// Ubicación de archivos estáticos de la interfaz web
const backendPublic = path.resolve(__dirname, "..", "public");
const repoRoot = path.resolve(__dirname, "..", "..", "..");

const staticDir = fs.existsSync(path.join(backendPublic, "index.html"))
  ? backendPublic
  : repoRoot;

// Servir archivos estáticos (CSS, JS, imágenes, etc.)
app.use(express.static(staticDir));
if (staticDir !== repoRoot && fs.existsSync(path.join(repoRoot, "index.html"))) {
  app.use(express.static(repoRoot));
}

// Rutas de la API Backend
app.use("/auth", authRoutes);
app.use("/usuarios", usuariosRoutes);

// Endpoint API para verificación de estado
app.get("/api", (_req, res) => {
  res.json({ mensaje: "API de Seguridad — NubaGlow App", status: "online" });
});

// Ruta raíz ("/") para servir la interfaz web principal (index.html)
app.get("/", (_req, res) => {
  const primaryIndex = path.join(staticDir, "index.html");
  if (fs.existsSync(primaryIndex)) {
    return res.sendFile(primaryIndex);
  }
  const rootIndex = path.join(repoRoot, "index.html");
  if (fs.existsSync(rootIndex)) {
    return res.sendFile(rootIndex);
  }
  res.json({ mensaje: "API de Seguridad — NubaGlow App (index.html no encontrado)" });
});

// Soporte para Render y despliegues en la nube usando process.env.PORT
const PUERTO = process.env.PORT || 4000;
app.listen(PUERTO, () => {
  console.log(`Servidor NubaGlow corriendo en http://localhost:${PUERTO}`);
});

