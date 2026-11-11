# Construction Analytics — Sitio Web Institucional (Estructura Plana .HTML)

Sitio web institucional multipágina con arquitectura plana para **Construction Analytics**, marca independiente especializada en capacitación profesional y soluciones analíticas para proyectos de construcción e ingeniería.

- **Dominio oficial:** [https://construction-analytics.online/](https://construction-analytics.online/)
- **Correo oficial:** commercial@construction-analytics.online
- **Teléfono y WhatsApp:** +51 993 463 118
- **Número para enlaces WhatsApp:** `51993463118`
- **Dirección física:** Av. Javier Prado 757, piso 10, Magdalena, Lima 17, Perú
- **Año:** 2026

---

## 🏛️ Propósito del Proyecto

Presentar la oferta técnica y de valor de Construction Analytics:
1. **Capacitación especializada:** Formación profesional en analítica de datos, Power BI, control de proyectos, metodologías BIM y gestión de costos/cronogramas.
2. **Soluciones analíticas profesionales:** Tableros de control de gestión, seguimiento operativo de obra y digitalización de procesos constructivos.

---

## 📁 Estructura del Proyecto (Archivos .HTML en la Raíz)

El sitio utiliza una arquitectura plana con archivos `.html` independientes en la raíz. Todas las referencias a estilos, scripts, imágenes e iconos emplean rutas relativas compatibles tanto con el protocolo local (`file://`) como con servidores HTTP y hosting compartido:

```text
construction-analytics-web/
├── index.html                   # Portada institucional resumida
├── nosotros.html                # Identidad, pilares metodológicos y áreas de enfoque
├── soluciones.html              # Catálogo de soluciones y metodología de trabajo
├── capacitacion.html            # Catálogo de programas formativos y beneficios
├── contacto.html                # Formulario de consulta estructurada y WhatsApp
├── privacidad.html              # Política de privacidad y tratamiento de datos
├── 404.html                     # Página personalizada de error 404
├── robots.txt                   # Directivas para motores de búsqueda
├── sitemap.xml                  # Mapa del sitio con las 6 URLs públicas
├── README.md                    # Documentación del proyecto
├── .gitignore                   # Exclusiones de control de versiones
└── assets/
    ├── css/
    │   └── styles.css           # Hoja de estilos global y responsive
    ├── js/
    │   └── main.js              # Lógica e interacciones Vanilla JS
    ├── icons/                   # Iconografía SVG
    └── img/                     # Logotipos, fotografía e isotipos optimizados
```

---

## 🧭 Navegación Principal y Enlaces

La navegación entre las páginas del sitio se realiza mediante archivos directos:
- **Inicio:** `index.html`
- **Nosotros:** `nosotros.html`
- **Soluciones:** `soluciones.html`
- **Capacitación:** `capacitacion.html`
- **Contacto:** `contacto.html`
- **Política de Privacidad:** `privacidad.html`

Cada página activa cuenta con el atributo `aria-current="page"` y la clase CSS `.active`.

---

## 💻 Pruebas y Visualización Local

### 1. Visualización Directa con Doble Clic (`file://`)
Gracias a las rutas relativas (`assets/css/styles.css`, `assets/js/main.js`, `assets/img/...`), cualquier archivo `.html` (incluyendo `index.html`) puede abrirse directamente con doble clic desde el explorador de archivos en cualquier navegador (Chrome, Edge, Firefox) cargando los estilos, imágenes, logos y tipografías.

### 2. Método Recomendado: Servidor HTTP Local
Aunque el sitio funciona con doble clic, la validación técnica más rigurosa (códigos de estado HTTP, parámetros GET y respuestas de red) se realiza mediante un servidor HTTP local iniciado desde la raíz del proyecto:

```powershell
# Iniciar servidor HTTP en el puerto 8000
py -m http.server 8000
# o bien:
python -m http.server 8000
```

Acceder en el navegador a:  
**`http://localhost:8000/`** (o `http://localhost:8000/index.html`)

---

## 🌐 Despliegue en GoDaddy (Hosting Compartido / cPanel)

Para publicar el sitio en GoDaddy:
1. Acceder al **cPanel** de la cuenta de hosting.
2. Abrir el **Administrador de Archivos** (*File Manager*).
3. Ingresar al directorio raíz del dominio: `public_html/`.
4. Copiar o subir todos los archivos `.html` (`index.html`, `nosotros.html`, `soluciones.html`, `capacitacion.html`, `contacto.html`, `privacidad.html`, `404.html`), `sitemap.xml`, `robots.txt` y la carpeta `assets/` directamente a la raíz de `public_html/`.
5. Verificar la navegación ingresando a [https://construction-analytics.online/](https://construction-analytics.online/).

---

## 📲 Formulario Integrado con WhatsApp

El formulario en `contacto.html` no requiere backend ni base de datos:
- **Validación en el navegador:** Comprueba nombre, formato de correo, teléfono, mensaje y consentimiento obligatorio de la política de privacidad.
- **Soporte de parámetro `?interes=`:** Permite preseleccionar un programa o solución (`contacto.html?interes=analitica-power-bi`, etc.) validando contra una lista blanca segura en `main.js`.
- **Generación de mensaje estructurado:** Construye un texto ordenado y abre automáticamente el canal oficial de WhatsApp (`51993463118`).
- **Seguridad:** Utiliza `textContent` para mensajes de estado en pantalla, evitando vulnerabilidades XSS por `innerHTML`.

---

## 🛠️ Procedimientos de Mantenimiento

### Para agregar un nuevo programa de capacitación:
1. Abrir `capacitacion.html` y duplicar una tarjeta dentro de `.programs-grid`.
2. Asignar el enlace del botón de consulta:
   `<a href="contacto.html?interes=nuevo-programa" class="btn-program-select">Solicitar información</a>`
3. En `assets/js/main.js`, agregar la clave en `ALLOWED_INTERESTS`:
   `'nuevo-programa': 'Nombre Exacto del Programa'`
4. En `contacto.html`, agregar el `<option>` correspondiente dentro del selector `<select id="programa">`.
5. Actualizar la tarjeta destacada en `index.html` si corresponde.

### Para actualizar `sitemap.xml`:
1. Abrir `sitemap.xml`.
2. Agregar la nueva URL pública canónica:
   `<url><loc>https://construction-analytics.online/nueva-pagina.html</loc><priority>0.8</priority></url>`
3. Guardar en formato UTF-8 sin BOM.

---

## ⚖️ Licencia y Derechos

&copy; 2026 **Construction Analytics**. Todos los derechos reservados.
Marca independiente orientada a la capacitación y analítica de datos en construcción.
