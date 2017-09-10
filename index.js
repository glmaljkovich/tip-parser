#!/usr/bin/env node
'use strict';
/**
 * Module dependencies.
 */
const fs = require('fs');
const program = require('commander');
const elasticsearch = require('elasticsearch');
const elastic = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});
const ES_INDEX = 'tip';
const PUNTOS_DIGITALES = 'puntos_digitales';

function getCKANData (data) {
  return data.result.records;
}

function saveFile (file) {
  fs.writeFile('datos.json', JSON.stringify(file), (error) => {
    if (error)
      console.log(error);
    console.log('File saved');
  });
}

function getPDData (list) {
  return list.map((element) => {
    let position = new LatLong(parseFloat(element.latitud), parseFloat(element.longitud));
    return new GeoData(position, element);
  });
}

function mapIndexArrayDocuments (array) {
  let result = [];
  for (let doc of array) {
    let indexOp = new ESIndexOp(PUNTOS_DIGITALES);
    result.push(indexOp);
    result.push(doc);
  }
  return result;
}

function bulkIndexES (list) {
  let indexArray = mapIndexArrayDocuments(list);
  elastic.bulk({
    body: indexArray
  }).then(
    (response) => console.log("Data successfully loaded."),
    (error) => console.log(error)
  );
}

function transformPuntosDigitales (list) {
  return getPDData(getCKANData(list));
}

function parseAndBulkUpload (file, docTransformFunction) {
  if (file) {
    console.log('reading file...');
    fs.readFile(file, 'utf8', function (err, data) {
      let doc = JSON.parse(data);
      console.log("File read.");
      console.log("Uploading records...");
      //saveFile(getPDData(doc));
      let transformedData = docTransformFunction(doc);
      bulkIndexES(transformedData);
    });
  } else {
    console.error("No file was specified");
  }
}

// DATA TYPES
function ESIndexOp (type) {
  this.index = {};
  this.index._index = ES_INDEX;
  this.index._type = type;
}

function LatLong (lat, long) {
  this.lat = lat;
  this.lon = long;
}

function GeoData (location, data) {
  this.location = location;
  this.data = data;
}

// function ESIndexOp (type) {
//   return {
//     index: {
//       _index: ES_INDEX,
//       _type: type
//     }
//   };
// }
//
// function LatLong (lat, long) {
//   return {
//     lat: lat,
//     long: long
//   };
// }
//
// function GeoData (location, data) {
//   return {
//     location: location,
//     data: data
//   };
// }

program
  .version('0.1.1')
  .usage('[options] <file>')
  .command('puntos-digitales <file>')
  .action(function(file){
    parseAndBulkUpload(file, transformPuntosDigitales);
  });

program.parse(process.argv);
