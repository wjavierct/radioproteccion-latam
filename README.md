# Radioprotección LATAM
Primera versión local en español. Sin base de datos, dependencias externas ni publicación.

## Ejecutar
Abre index.html directamente en un navegador moderno. También puedes servir la carpeta con Python:
    python -m http.server 8080 --bind 127.0.0.1
Luego abre http://127.0.0.1:8080. Ejecuta el comando desde esta carpeta.

## Estructura y ampliación
- index.html: secciones y contenido educativo.
- assets/styles.css: estilos adaptables y estados accesibles.
- assets/app.js: función pura inverseSquare y comportamiento de la interfaz.

Para agregar calculadoras, incorpora funciones independientes con validación y pruebas numéricas; crea formularios con etiquetas y resultados accesibles. Para ampliar el contenido, separa artículos en páginas HTML dentro de articulos/, ejercicios/ y normativa/<pais>/, manteniendo enlaces relativos. Cada documento regulatorio debe registrar país, autoridad, título, fuente oficial, fecha de consulta y vigencia verificada. No introduzcas límites sin esa verificación. En esta versión el catálogo regulatorio permanece pendiente.

## Fórmula y alcance
Ṡ₂ = Ṡ₁ × (r₁ / r₂)². Las distancias son positivas y se expresan en metros. La tasa inicial es finita y no negativa; la unidad mSv/h, µSv/h, mGy/h o µGy/h se conserva. El resultado se calcula al enviar el formulario con el botón Calcular tasa de dosis; editar los datos invalida el resultado anterior. No se convierte dosis absorbida a magnitudes en sievert. Se rechazan resultados no representables en el rango numérico del navegador.

Ejemplo hipotético: 0,8 mSv/h a 1 m produce 0,2 mSv/h a 2 m. Fuente puntual ideal, emisión constante y sin atenuación ni dispersión significativas. No modela fuentes extensas ni cambios de blindaje.

Referencias:
- IUPAC, Inverse square law: https://goldbook.iupac.org/terms/view/I03145
- OIEA, Radiation Protection in Nuclear Medicine, TCS 40: https://www-pub.iaea.org/MTCD/Publications/PDF/TCS-40_web.pdf

## Desplegar en Cloudflare Workers Static Assets
El proyecto usa Workers Static Assets, sin Workers Sites ni KV. wrangler.jsonc define el nombre radioproteccion-latam, la fecha de compatibilidad 2026-10-05 y assets.directory como "." para servir los archivos web desde la raíz. No requiere script Worker ni compilación.

Con Node.js y npm instalados, ejecuta desde la raíz del proyecto:

    npx wrangler@4 login
    npx wrangler@4 dev

Para validar el paquete sin desplegar:

    npx wrangler@4 deploy --dry-run

Para publicar cuando lo decidas:

    npx wrangler@4 deploy

Si conectas el repositorio mediante Cloudflare Workers Builds, usa como comando de despliegue npx wrangler@4 deploy, con la raíz del repositorio como directorio del proyecto y sin paso de compilación.

.assetsignore excluye del despliegue el historial Git, configuración, documentación, dependencias y archivos locales de credenciales; estos archivos permanecen en el proyecto. index.html y assets/ se sirven como contenido estático. El navegador realiza los cálculos.

Documentación: https://developers.cloudflare.com/workers/static-assets/
Repositorio: https://github.com/wjavierct/radioproteccion-latam.git
Carpeta local: C:\Users\SOLCA\Documents\Codex\radioproteccion-latam.
Preparar la configuración y enviar commits a GitHub no ejecuta un despliegue de Cloudflare desde esta terminal.

## Revisión
La comprobación numérica incluye duplicar y reducir a la mitad la distancia, distancias iguales, tasa cero, datos inválidos y extremos numéricos. El contenido especializado y regulatorio deberá ampliarse con revisión documental.
