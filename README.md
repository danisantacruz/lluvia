# Días con y sin lluvia · Nariño, Cauca, Valle del Cauca y Chocó

Tablero web del proyecto integrador de la Especialización en Big Data (Universidad CESMAG, 2026).
Equipo: Daniel Cabrera, Daniel Santacruz y Juan Usamá. Docente: Mag. José Camilo Eraso.

El sitio muestra, con datos de precipitación del IDEAM (datos.gov.co) procesados con Apache Spark:

- las cifras clave del proyecto y el acierto de los modelos frente a la climatología y la persistencia;
- un simulador de la semana típica por mes y departamento;
- la estacionalidad de los días secos, el embudo del pipeline (bronce, plata, oro) y la calidad de la fuente;
- **la predicción por estación**: probabilidad de lluvia de cada día de la semana siguiente y días secos esperados (`data/pronostico_semana.csv`), y la comprobación semana a semana con datos reales del periodo de prueba (`data/verificacion_semanas.csv`);
- un **recorrido guiado** para la sustentación (botón "Recorrido para el jurado").

## Estructura

```
index.html          página del tablero
dash-local.js       lee los CSV de data/ (no hace falta servidor propio ni base de datos)
vendor/d3.min.js    librería de gráficas (incluida para que funcione sin internet)
data/*.csv          datos que exporta la sección 9 del notebook 01
```

## Publicarlo en GitHub Pages (≈ 10 minutos)

1. En GitHub, creen un repositorio público, por ejemplo `lluvia-pacifico-andino`.
2. Suban **el contenido** de esta carpeta (no la carpeta en sí): `index.html`, `dash-local.js`, `README.md` y las carpetas `data/` y `vendor/`.
   Desde la web: **Add file → Upload files**, arrastren todo y pulsen **Commit changes**.
3. Vayan a **Settings → Pages**. En *Build and deployment* elijan **Deploy from a branch**, rama **main**, carpeta **/ (root)**, y pulsen **Save**.
4. En uno o dos minutos el sitio queda en `https://<su-usuario>.github.io/lluvia-pacifico-andino/`.
5. Recomendado: suban también los notebooks (00 y 01) a una carpeta `notebooks/` del mismo repositorio.

## Actualizar los datos

1. Ejecuten el notebook 01 completo en Colab (incluidas las **secciones 7 y 9**). Para pronosticar la semana que empieza, ejecútenlo un lunes.
2. En Google Drive, abran `proyecto_bigdata_lluvia/salidas/tablero/` y descarguen todos los CSV.
3. En GitHub, entren a la carpeta `data/`, pulsen **Add file → Upload files**, suban los CSV (reemplazan a los anteriores) y pulsen **Commit changes**.

El sitio se actualiza solo en uno o dos minutos. Si `pronostico_semana.csv` o `verificacion_semanas.csv` no están, la sección de predicción muestra un aviso y el resto funciona igual.

**Nota sobre `auc_horizonte.csv`:** la versión incluida tiene valores aproximados, leídos de la gráfica del notebook. Se reemplaza por la exacta al subir el archivo que exporta la sección 9.

## Verlo en su computador antes de publicar

Los navegadores no dejan leer archivos CSV abriendo `index.html` con doble clic. Desde esta carpeta ejecuten:

```
python -m http.server 8000
```

y abran `http://localhost:8000` en el navegador.

## Código QR para el póster

Con la dirección del sitio ya publicada:

```python
# pip install qrcode[pil]
import qrcode
qrcode.make("https://<su-usuario>.github.io/lluvia-pacifico-andino/").save("qr_tablero.png")
```

También sirve cualquier generador de QR en línea. Inserten `qr_tablero.png` en el recuadro `[QR]` del póster.

## Fuentes

- IDEAM – Datos hidrometeorológicos crudos: precipitación. datos.gov.co, conjunto `s54a-sgyg`.
- IDEAM – Catálogo Nacional de Estaciones. datos.gov.co, conjunto `hp9r-jxuu`.
