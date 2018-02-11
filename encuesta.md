# Encuesta

#### 1. Datos Socio Demograficos

**Campos**

Nombre                                  | Tipo de dato
----------------------------------------|-----------------------
edad                                    | numerico
sexo                                    | texto
esquina_más_cercana                     | ??? <br> **Posibilidades:** <br> 1. Dos campos de texto `calle_1` y `calle_2` <br> 2. `geo_point` usando geolocalizacion
nivel_de_educacion                      | texto
trabaja                                 | booleano

#### 2. Transporte

**Campos**

Nombre                                  | Tipo de dato
----------------------------------------|-----------------------
numero_de_cuadras_a_parada_de_colectivo | numerico
numero_de_cuadras_a_estacion_de_tren    | numerico
frecuencia_colectivo                    | numerico
frecuencia_tren                         | numerico
medios_de_transporte_utilizados_UNQ     | texto? Array?
tiempo_de_viaje_por_transporte_UNQ      | Array de JSON? `[{transporte, duracion}]`
medios_de_transporte_utilizados_trabajo     | texto? Array?
tiempo_de_viaje_por_transporte_trabajo      | Array de JSON? `[{transporte, duracion}]`
costo_viaje_a_UNQ                       | numerico


#### 3. Conectividad

**Campos**

Nota: Candidatos a eliminacion en **negrita**.

Nombre                     | Tipo de dato
---------------------------|-----------------------
tiene_telefono_fijo        | booleano
tiene_celular              | texto (multiples opciones)
**servicios_que_tiene_y_paga** | Diccionario `{ "nombre de servicio": {tiene: bool, paga: bool}, ...}`
velocidad_banda_ancha      | numerico (Multiples opciones excluyentes)

#### 4. Servicios Bancarios

**Campos**

Nombre                     | Tipo de dato
---------------------------|-----------------------
tiene_cuenta_bancaria      | booleano
usa_home_banking           | booleano
tiene_tarjeta_de_credito   | booleano
negocios_con_postnet_cerca | numerico (Multiples opciones excluyentes)
cajeros_automaticos_cerca  | numerico (Multiples opciones excluyentes)
cajero_mas_cercano         | numerico (cuadras)
banco_mas_cercano          | numerico (cuadras)

----

**Campos dejados afuera**
- 2.10 ¿Por qué opta por esos modos de viaje? Elija las dos razones principales
- 2.11. ¿Cuáles son los principales inconvenientes de los viajes en colectivo y en tren? Elija dos para cada caso.
- 2.12. A partir de su experiencia, ¿cómo evalúa la calidad del servicio de colectivos y tren que lo comunican con su casa?
- 2.14. ¿La oferta de transporte influye en su programación de sus actividades en la UNQ?
- 3.3. ¿Cómo evalúa la calidad del servicio de telefonía celular estando en su casa?
- 3.4. ¿Cómo evalúa la calidad del servicio de internet (3G o 4G) en su celular estando en su casa?
- 3.6.b Internet en el celular. (Multiples opciones y Entrada del usuario)
- 3.7. ¿Cómo evalúa la velocidad de la banda ancha de su casa?
- 3.8. ¿Por qué en su casa no contratan servicio de banda ancha o internet satelital? Elija una o dos de las razones principales.
- 4.4. ¿Los comercios de su barrio aceptan tarjeta de débito o crédito? (Tipo de dato complejo)
- 4.7. ¿Cuál es el tiempo de espera promedio para utilizar el cajero automático una vez allí?
- 4.9. En los últimos 5 años, ¿algún miembro del hogar obtuvo préstamos bancarios?
- 4.10. ¿Por qué no?
- 4.11. En los últimos 5 años, ¿algún miembro del hogar tuvo algún otro tipo préstamo?
- SECCION 5 COMPLETA
----

#### Errores en la Encuesta
- 3.5. En su casa, ¿tienen alguno de los siguientes servicios?, ¿pagan por ellos?

|            paga | no paga
-----------|------|-----
servicio 1 |      |

Tiene mas sentido:

|           tiene | paga
-----------|------|-----
servicio 1 |      |


- 3.6 Internet en el celular: prepago con tarjeta o recarga / 1 MEGA / 2 o 3 MEGAS / más de 3 MEGAS. *Deberian ser **GIGABITS o GIGABYTES** (dependiendo que tan engañosa sea la publicidad del prestador)*
