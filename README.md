# 🎉 Página de Cumpleaños - Sorpresa Especial

Una hermosa página web interactiva para celebrar el cumpleaños número 18 de tu novia. Diseñada con mucho amor, sin fotos, solo contiene elementos visuales hermosos con tema morado pastel.

## ✨ Características

- 💜 Diseño premium con tema morado pastel
- 🎊 Animaciones suaves y efectos visuales
- 📊 Sección de estadísticas de amor con contadores animados
- 💖 6 razones por las que la amas (con efectos hover)
- 📝 Sección de mensajes especiales
- 🎯 Quiz interactivo personalizable
- 💌 Carta de amor emocionante
- 📅 Línea del tiempo de momentos especiales
- 🎈 Efectos de confeti y celebración
- 📱 Completamente responsive (móvil y desktop)
- ⚡ Optimizado para Vercel - despliega en segundos

## 📁 Estructura de Archivos

```
.
├── index.html          # Página principal
├── styles.css          # Estilos y diseño
├── script.js           # Interactividad y efectos
├── vercel.json         # Configuración para Vercel
├── .gitignore          # Archivos a ignorar en git
└── README.md           # Este archivo
```

## 🎨 Personalización

### Cambiar el Mensaje Principal

Abre `index.html` y busca la sección `<section class="welcome-section">`. Ahí puedes cambiar:

- El texto "Feliz Cumpleaños" (busca `.main-title`)
- El subtítulo (busca `.subtitle`)
- El texto "¡Bienvenida a los 18!" (busca `.age-text`)

### Editar la Sección de Estadísticas

Busca `<section class="stats-section">` en `index.html`. Puedes cambiar:

1. **Los números**: Modifica `data-target="365"` con el número que quieras
2. **Los textos**: Cambia "Días dándote besos" por lo que desees

Ejemplo:
```html
<div class="stat-card">
    <div class="stat-number" data-target="1000">0</div>
    <div class="stat-label">Besos que te he dado</div>
</div>
```

### Editar las 6 Razones

Busca `<section class="reasons-section">` en `index.html`. Cada tarjeta tiene un número y un texto:

```html
<div class="reason-card">
    <div class="reason-number">1</div>
    <p>Tu sonrisa ilumina mis días</p>
</div>
```

Cambia el número (1, 2, 3...) y el texto con tus propias razones.

### Personalizar el Quiz

Busca `<section class="quiz-section">` en `index.html`. Puedes cambiar:

1. Las preguntas
2. Las opciones de respuesta

Ejemplo:
```html
<div class="quiz-card">
    <h3>¿Cuál es mi color favorito?</h3>
    <div class="quiz-options">
        <button class="quiz-btn">Azul</button>
        <button class="quiz-btn">Rosa</button>
        <button class="quiz-btn">Verde</button>
        <button class="quiz-btn">Morado</button>
    </div>
</div>
```

### Cambiar Colores

Si quieres cambiar el tema de morado pastel, abre `styles.css` y modifica las variables en la sección `:root`:

```css
:root {
    --purple-light: #E8D5F2;      /* Morado muy claro */
    --purple-pastel: #D4A5E0;    /* Morado pastel */
    --purple-medium: #C084D8;    /* Morado medio */
    --purple-dark: #9B5BA8;      /* Morado oscuro */
    /* ... más colores */
}
```

### Editar la Carta de Amor

1. Abre `index.html`
2. Busca la sección `<section class="love-letter-section">`
3. Modifica el contenido de los párrafos `<p>`

### Cambiar Mensajes de las Tarjetas

Busca `<section class="messages-section">` en `index.html` y edita los títulos y textos de las tarjetas.

## 🚀 Desplegar en Vercel

### Método 1: Usando Git (Recomendado)

1. **Instala Git** (si no lo tienes): https://git-scm.com/

2. **Abre la terminal en la carpeta del proyecto** y ejecuta:

```bash
git init
git add .
git commit -m "Mi página de cumpleaños"
```

3. **Crea un repositorio en GitHub**:
   - Ve a https://github.com/new
   - Crea un nuevo repositorio (puede ser privado)
   - Copia los comandos que te dan y pégalos en la terminal

4. **Despliega en Vercel**:
   - Ve a https://vercel.com
   - Haz clic en "Import Project"
   - Selecciona tu repositorio de GitHub
   - Haz clic en "Deploy"
   - ¡Listo! Tu página estará en línea en minutos

### Método 2: Drag & Drop en Vercel

1. Ve a https://vercel.com/new
2. Arrastra tu carpeta del proyecto al área indicada
3. Vercel automáticamente detectará que es un sitio estático
4. Haz clic en "Deploy"

### Método 3: Usando Vercel CLI

```bash
npm install -g vercel
cd "ruta/a/tu/proyecto"
vercel
```

## 🎯 Consejos

- **Personalización**: Tómate tiempo para editar todos los textos con cosas específicas sobre tu novia
- **Las razones**: Cámbialas por razones reales, ser específico es más emotivo
- **El quiz**: Personalízalo con sus comidas, películas y artistas favoritos reales
- **La carta**: Es lo más importante, escribe desde el corazón
- **Privacidad**: Si creas el repositorio privado en GitHub, solo tú podrás verlo
- **Dominio personalizado**: Después de desplegar en Vercel, puedes agregar tu propio dominio

## 🎨 Opciones de Fondo

Si quieres cambiar el fondo de alguna sección, busca en `styles.css` y modifica los valores `background`.

Ejemplo para cambiar el color de fondo del body:
```css
body {
    background: linear-gradient(180deg, #F5F0FA 0%, #E8D5F2 50%, #D4A5E0 100%);
}
```

## 🎵 Agregar Música (Opcional)

Para agregar música de fondo:

1. Abre `script.js`
2. Busca la sección comentada al final
3. Descomenta y reemplaza la URL con tu enlace de música
4. La música debe estar en formato MP3 o WAV

Nota: Algunos navegadores no permiten autoplay de audio. El usuario deberá interactuar con la página primero.

## 📱 Compatibilidad

- ✅ Chrome, Firefox, Safari, Edge
- ✅ iPhone, iPad, Android
- ✅ Tablets y escritorio
- ✅ Dispositivos antiguos (optimizado)

## 🐛 Solución de Problemas

**Los contadores no se animan:**
- Asegúrate de que JavaScript está habilitado
- Intenta refrescar la página (Ctrl+F5)
- Los contadores se animan cuando haces scroll a la sección

**Las animaciones se ven lentas:**
- Esto es normal en dispositivos antiguos
- Es seguro desactivarlas en `styles.css` si lo necesitas

**No funciona el botón de sorpresa:**
- El confeti debería funcionar siempre
- El audio no funciona en algunos navegadores por seguridad

**El quiz no responde:**
- Los botones del quiz son visuales, puedes agregar funcionalidad si quieres
- Ver sección "Personalización Avanzada" para agregar interactividad real

## 💝 Personalización Avanzada

### Cambiar el tipo de fuente

En `styles.css`, modifica:
```css
body {
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
```

Puedes usar Google Fonts: https://fonts.google.com

### Agregar más secciones

Copia cualquier sección existente en `index.html` y personalízala.

### Cambiar velocidad de animaciones

En `styles.css`, busca `animation:` y modifica el segundo valor (ej: `0.6s` = 600ms).

## 📧 Ayuda

Si encuentras problemas:
1. Verifica la consola del navegador (F12 > Console) para errores
2. Revisa que todos los archivos estén en la misma carpeta
3. Asegúrate de que los nombres de archivos sean exactos (mayúsculas/minúsculas importan)

## 💖 ¡Espero que le encante!

Hecha con mucho amor para hacer especial su día. ¡Que disfrute! 🎉

---

**Última actualización**: 2026-05-29

"# nose" 
