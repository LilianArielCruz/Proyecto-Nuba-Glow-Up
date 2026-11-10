# NubaGlow App — Plataforma Beauty-Tech Unificada
> **by Nuba Beauty (Sucre, Chuquisaca – Bolivia)**  
> **Integrantes del Proyecto**: Arancibia Morales Shirley • Chambi Lopez Naydelin • Cruz Romero Lilian Ariel

---

## 🌸 Descripción General

**NubaGlow App** es una plataforma web modular e integral de comercio electrónico y gestión operativa para cosmética y dermocuidado en Bolivia. Esta versión fusiona y unifica:
1. **La Landing Page E-commerce orientada al cliente**: Catálogo interactivo con filtro por tipo de piel, Asistente de IA (Skin Advisor) con animación fluida de 1.5s, persistencia del carrito de compras en `localStorage`, checkout instantáneo con **QR Simple Bolivia** y módulo de trazabilidad logística en vivo.
2. **El Panel de Administración (Backroom / Backoffice)**: Control operativo protegido por roles con 5 módulos clave:
   - **Módulo 1: E-commerce** (Catálogo, altas, bajas, modificaciones de productos y sincronización de stock en tiempo real).
   - **Módulo 2: Cobros** (Historial de transacciones por QR Simple, métricas de recaudación, reportes y comprobantes de pago).
   - **Módulo 3: Distribución / Logística** (Monitoreo de despachos locales en Sucre y envíos nacionales a La Paz, Santa Cruz, Cochabamba, etc., asignación de guías y cambio de estados).
   - **Módulo 4: Almacén** (Control de existencias físicas, alertas automáticas de punto de reorden para stock <= 5 unidades y recepción de mercadería).
   - **Módulo 5: Seguridad de Usuarios (RBAC)** (Gestión de usuarios registrados, roles de acceso y bitácora de auditoría / *Audit Trail*).

---

## 🎨 Nuevo Sistema de Diseño (Design System Beauty-Tech)

- **Color Primario / Acentos (Magenta Profundo / Fucsia K-pop)**: `#9C2774`  
  *Para botones CTA principales, estados activos, bordes destacados e insignias.*
- **Color Secundario (Lila / Violeta Suave)**: `#D1A3D9` y `#C88EA7`  
  *Para contenedores secundarios, modales, tarjetas con efecto de cristal (glassmorphism) y badges de estado.*
- **Fondo Claro (Rosa Lavanda Muy Claro)**: `#F7EEF8` y `#FDF4FA`  
  *Reemplazando fondos planos por una atmósfera cálida, limpia y cosmética.*
- **Tono de Contraste y Tipografía**:  
  - `#FFFFFF` para fondos de tarjetas y modales principales.
  - `#3A1033` para tipografía principal, garantizando legibilidad y alto contraste (WCAG AAA).
- **Tipografía**: Sans-serif moderna y limpia (*Plus Jakarta Sans*).

---

## 🔐 Credenciales y Conmutador de Roles (RBAC)

El sistema incluye un **Conmutador Rápido de Roles (Demo)** y un formulario de inicio de sesión manual para validar permisos:

| Rol | Correo Electrónico | Contraseña | Permisos Principales |
|---|---|---|---|
| **Administradora** | `admin@nuba.bo` | `admin1234` | Acceso total al Backroom, gestión de los 5 módulos y auditoría. |
| **Vendedora (POS)** | `vendedor@nuba.bo` | `vende1234` | Cobros, ventas en mostrador y gestión de catálogo. |
| **Gestora Almacén** | `almacen@nuba.bo` | `alma1234` | Control de stock físico, alertas de reorden y recepción de lotes. |
| **Encargada Logística**| `logistica@nuba.bo` | `logi1234` | Asignación de guías y actualización de etapas de despacho. |
| **Cliente** | `cliente@nuba.bo` | `clie1234` | Navegación e-commerce, recomendador IA y pagos QR Simple. |

---

## 🚀 Cómo Ejecutar la Aplicación

La aplicación está construida de forma autónoma con **HTML5 semántico, Tailwind CSS y JavaScript modular moderno**:

### Opción 1: Servidor Local (Recomendado)
```bash
npm start
# o alternativamente:
npx serve . -l 3000
```
Luego abre tu navegador en: [http://localhost:3000](http://localhost:3000)

### Opción 2: Apertura Directa
Puedes abrir directamente el archivo `index.html` en cualquier navegador web moderno (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).

---

## 📱 Características Destacadas de UX/UI

1. **Persistencia Total del Carrito (`localStorage`)**:
   - Guarda productos, cantidades, ciudad de destino y cálculos de flete. Permanece intacto tras recargar la página.
2. **Asistente IA con Carga Fluida de 1.5s**:
   - Animación interactiva por etapas:
     1. *"Analizando tipo de piel y biotipo..."*
     2. *"Calculando compatibilidad de ingredientes..."*
     3. *"Seleccionando fórmulas en almacén central de Sucre..."*
   - Despliegue de rutina AM/PM y botón *"Añadir Todo el Set"*.
3. **Flujo de Checkout QR Simple & Trazabilidad**:
   - Temporizador dinámico de 5 minutos para el QR.
   - Emisión de código de rastreo (ej. `NG-SUC-XXXX`) y botón directo de confirmación hacia **WhatsApp**.
   - Módulo interactivo de rastreo con etapas: *Almacén -> Control Calidad -> En Camino -> Entregado*.
4. **Sincronización en Tiempo Real**:
   - Todo cambio de stock realizado en el Panel de Almacén o en compras QR se refleja de inmediato en las tarjetas de producto de la tienda.
