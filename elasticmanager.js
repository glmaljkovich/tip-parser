const fs                              = require('fs');
const elasticsearch                   = require('elasticsearch');
const { ESIndexOp, LatLong, GeoData } = require('./datatypes');
const ES_INDEX = 'tip';
const PUNTOS_DIGITALES = 'puntos_digitales';

// The ElasticSearch instance
const elastic = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});

/**
 * getCKANData - Strips the records from the unnecessary CKAN metadata
 * @param  {Object} data CKAN records container
 * @return {Array}      records
 */
function getCKANData (data) {
  return data.result.records;
}

/**
 * saveFile - Saves a JSON object to datos.json
 * @param  {Object} file the JSON object to be saved
 */
function saveFile (file) {
  fs.writeFile('datos.json', JSON.stringify(file), (error) => {
    if (error)
      console.log(error);
    console.log('File saved');
  });
}


/**
 * getPDData - Parses Puntos Digitales to obtain their GeoData
 *
 * @param  {Array} list Puntos Digitales
 * @return {Array}      Puntos Digitales with GeoPoints
 */
function getPDData (list) {
  return list.map((element) => {
    let position = new LatLong(parseFloat(element.latitud), parseFloat(element.longitud));
    return new GeoData(position, element);
  });
}



/**
 * mapIndexArrayDocuments - maps an array of documents to an array of ElasticSearch Index Operations containing those documents.
 *
 * @param  {Array} array documents
 * @return {Array}       ElasticSearch Index Operations
 */
function mapIndexArrayDocuments (array) {
  let result = [];
  for (let doc of array) {
    let indexOp = new ESIndexOp(PUNTOS_DIGITALES, ES_INDEX);
    result.push(indexOp);
    result.push(doc);
  }
  return result;
}


/**
 * bulkIndexES - It indexes an array of documents in the ElasticSearch instance.
 *
 * @param  {type} list description
 * @return {type}      description
 */
function bulkIndexES (list) {
  let indexArray = mapIndexArrayDocuments(list);
  elastic.bulk({
    body: indexArray
  }).then(
    (response) => console.log("Data successfully loaded."),
    (error) => console.log(error)
  );
}


/**
 * transformPuntosDigitales - Gets a document containing an array of Puntos Digitales ready to consume by ElasticSearch.
 * @param  {Object} ckanData CKAN Data
 * @return {Array}      Puntos Digitales
 */
function transformPuntosDigitales (ckanData) {
  return getPDData(getCKANData(ckanData));
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

function processPuntosDigitales(file){
  parseAndBulkUpload(file, transformPuntosDigitales);
}


/**
 * bulkIndexData - Uploads the data to ElasticSearch
 *
 * @param  {string} file the JSON file
 */
function bulkIndexData (file) {
  parseAndBulkUpload(file, (list) => list);
}

module.exports = {
  processPuntosDigitales,
  bulkIndexData,
  parseAndBulkUpload
};
