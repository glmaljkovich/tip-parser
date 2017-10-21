const fs                              = require('fs');
const elasticsearch                   = require('elasticsearch');
const { ESIndexOp, LatLong, GeoData } = require('./datatypes');
const ES_INDEX = 'tip';
const PUNTOS_DIGITALES = 'puntos_digitales';
const ELASTIC_DEFAULT = {
  host: 'http://elastic:changeme@localhost:9200'
};

class ElasticManager {
  constructor (index, type, elasticInstance) {
    // The ElasticSearch instance
    this.host = elasticInstance || ELASTIC_DEFAULT;
    this.elastic = new elasticsearch.Client(this.host);
    this.esIndex = index || ES_INDEX;
    this.type = type || PUNTOS_DIGITALES;
  }

  /**
   * getCKANData - Strips the records from the unnecessary CKAN metadata
   * @param  {Object} data CKAN records container
   * @return {Array}      records
   */
  getCKANData (data) {
    return data.result.records;
  }

  /**
   * saveFile - Saves a JSON object to datos.json
   * @param  {Object} file the JSON object to be saved
   */
  saveFile (file) {
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
  getPDData (list) {
    return list.map((element) => {
      let position = new LatLong(parseFloat(element.latitud), parseFloat(element.longitud));
      return new GeoData(position, element);
    });
  }

  getVillasData (list) {
    return list.map((element) => {
      let area = JSON.parse(element.geojson);
      let standardArea = {
        "type": "multipolygon",
        "coordinates": area.coordinates
      };
      return {
        "data": element,
        "area": standardArea
      };
    });
  }

  /**
   * mapIndexArrayDocuments - maps an array of documents to an array of ElasticSearch Index Operations containing those documents.
   *
   * @param  {Array} array documents
   * @return {Array}       ElasticSearch Index Operations
   */
  mapIndexArrayDocuments (array) {
    let result = [];
    for (let doc of array) {
      let indexOp = new ESIndexOp(this.type, this.esIndex);
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
  bulkIndexES (list) {
    let indexArray = this.mapIndexArrayDocuments(list);
    this.elastic.bulk({
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
  transformPuntosDigitales (ckanData) {
    return this.getPDData(this.getCKANData(ckanData));
  }

  transformVillas (ckanData) {
    return this.getVillasData(this.getCKANData(ckanData));
  }

  identityTransform (data) {
    return data;
  }

  parseAndBulkUpload (file, docTransformFunction) {
    if (file) {
      console.log('reading file...');
      let that = this;
      fs.readFile(file, 'utf8', (err, data) => {
        let doc = JSON.parse(data);
        console.log("File read.");
        console.log("Uploading records...");
        //saveFile(getPDData(doc));
        let transformedData = that[docTransformFunction](doc);
        this.bulkIndexES(transformedData);
      });
    } else {
      console.error("No file was specified");
    }
  }

  processPuntosDigitales(file){
    this.parseAndBulkUpload(file, 'transformPuntosDigitales');
  }

  processVillas (file) {
    this.parseAndBulkUpload(file, 'transformVillas');
  }


  /**
   * bulkIndexData - Uploads the data to ElasticSearch
   *
   * @param  {string} file the JSON file
   */
  bulkIndexData (file) {
    this.parseAndBulkUpload(file, 'identityTransform');
  }

}

module.exports = ElasticManager;
