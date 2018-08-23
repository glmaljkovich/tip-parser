

### Llamadas ElasticSearch

**Get Document**
```
GET /tip/puntos_digitales/2
```

**Search (obtener todos los documentos de un tipo)**
```
GET /tip/puntos_digitales/_search
```

**Creacion de Indice**

```
PUT tip
  {
    "mappings": {
      "senso": {
        "properties": {
          "location": {
            "type": "geo_point"
          },
          "data": {
            "type": "object",
            "dynamic": true
          },
          "area": {
            "type": "geo_shape"
          }
        }
      }
    }
  }
```

**Agregar Tipo**
```
PUT tip/_mapping/senso
{
  "properties": {
    "location": {
      "type": "geo_point"
    },
    "data": {
      "type": "object",
      "dynamic": true
    },
    "area": {
      "type": "geo_shape"
    }
  }
}
```

**Eliminar todas los registros de un Tipo**
```
POST tip/senso/_delete_by_query
{
  "query": {
    "match_all": {}
  }
}
```
