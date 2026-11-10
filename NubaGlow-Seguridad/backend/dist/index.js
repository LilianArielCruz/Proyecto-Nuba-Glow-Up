"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
require("./db/database");
const auth_1 = __importDefault(require("./routes/auth"));
const usuarios_1 = __importDefault(require("./routes/usuarios"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Ubicación de archivos estáticos de la interfaz web
const backendPublic = path_1.default.resolve(__dirname, "..", "public");
const repoRoot = path_1.default.resolve(__dirname, "..", "..", "..");
const staticDir = fs_1.default.existsSync(path_1.default.join(backendPublic, "index.html"))
    ? backendPublic
    : repoRoot;
// Servir archivos estáticos (CSS, JS, imágenes, etc.)
app.use(express_1.default.static(staticDir));
if (staticDir !== repoRoot && fs_1.default.existsSync(path_1.default.join(repoRoot, "index.html"))) {
    app.use(express_1.default.static(repoRoot));
}
// Rutas de la API Backend
app.use("/auth", auth_1.default);
app.use("/usuarios", usuarios_1.default);
// Endpoint API para verificación de estado
app.get("/api", (_req, res) => {
    res.json({ mensaje: "API de Seguridad — NubaGlow App", status: "online" });
});
// Ruta raíz ("/") para servir la interfaz web principal (index.html)
app.get("/", (_req, res) => {
    const primaryIndex = path_1.default.join(staticDir, "index.html");
    if (fs_1.default.existsSync(primaryIndex)) {
        return res.sendFile(primaryIndex);
    }
    const rootIndex = path_1.default.join(repoRoot, "index.html");
    if (fs_1.default.existsSync(rootIndex)) {
        return res.sendFile(rootIndex);
    }
    res.json({ mensaje: "API de Seguridad — NubaGlow App (index.html no encontrado)" });
});
// Soporte para Render y despliegues en la nube usando process.env.PORT
const PUERTO = process.env.PORT || 4000;
app.listen(PUERTO, () => {
    console.log(`Servidor NubaGlow corriendo en http://localhost:${PUERTO}`);
});
