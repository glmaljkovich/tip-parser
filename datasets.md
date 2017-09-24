# Datasets

#### Puntos Digitales
**Total:** 290

**Metadata** <br>
http://datos.gob.ar/api/3/action/package_show?id=puntos-digitales

**Descarga** (Primeros 100)<br>
http://datos.gob.ar/api/3/action/datastore_search?resource_id=e0c4a825-9017-4b57-bf27-a015e02bebcc

**Campos**

Nombre                       | Tipo de dato
-----------------------------|-----------------------
nombre_pd                    | texto
direccion                    | texto
nombre_institucional         | texto
provincia                    | texto
departamento                 | texto
localidad                    | texto
municipio                    | texto
mail_institucional           | texto
latitud                      | numerico
longitud                     | numerico
horarios                     | texto
link_facebook                | texto
estado (Activo / Inactivo)   | texto

#### Barrios Populares (Villas)
**Total:** 4100

**Metadata** <br>
http://datos.gob.ar/api/3/action/package_show?id=barrios-populares-argentina

**Descarga** (Primeros 100)<br>
http://datos.gob.ar/api/3/action/datastore_search?resource_id=36c3e63d-7f56-4241-88fd-6a9142b76538

**Campos**

Nombre                       | Tipo de dato
-----------------------------|-----------------------
 barrio_nombre               | texto
 localidad_comuna_nombre     | texto
 partido_departamento_nombre | texto
 provincia_nombre            | texto
 geojson                     | texto con JSON adentro ```{ type: Multipolygon, coordinates: [[]]}``` Se mapea directamente a `geo_shape` de Kibana despues de pasarlo a JSON.


## Otros interesantes pero con problemas

 #### Centros de Acceso a la Justicia (CAJ)
 **Nota:** No funciona correctamente la API. No se pudo previsualizar los campos del dataset en el navegador. Hay que descargar el CSV

 **Metadata** <br>
 http://datos.gob.ar/api/3/action/package_show?id=centros-acceso-justicia--caj-
