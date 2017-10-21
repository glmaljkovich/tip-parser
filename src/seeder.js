const { GeoData, LatLong } = require('./datatypes');
const { Random } = require('./utils');
const fs         = require('fs');


/**
 * Seeder for a specific field in the fixture
 */
class FieldSeeder {
  constructor() {

  }

  /**
   * addField - Add field to element
   *
   * @param  {GeoData} element
   * @param  {type} field
   * @return {type}         description
   */
  addField(element, field) {
    console.log("#addField() - Not implemented");
  }
}

class NumberSeeder extends FieldSeeder {
  addField(element, field) {
    let min = field.options[0];
    let max = field.options[1];
    element.data[field.name] = Random.getIntInclusive(min, max);
  }
}

class BooleanSeeder extends FieldSeeder {
  addField(element, field) {
    element.data[field.name] = Random.getBoolean();
  }
}

class GeoPointSeeder extends FieldSeeder {
  addField(element, field) {
    let center = new LatLong(field.options.center[0], field.options.center[1]);
    let radius = field.options.radius;
    element.location = Random.getGeoPoint(center, radius);
  }
}


/**
 * A GeoData Seeder
 */
class Seeder {

  constructor(fieldSeeders) {
    this.fieldSeeders = fieldSeeders || {};
  }

  /**
   * addFieldSeeder - Add a FieldSeeder with name to the dictionary
   *
   * @param  {string} name FieldSeeder name
   * @param  {FieldSeeder} fieldSeeder
   */
  addFieldSeeder (name, fieldSeeder) {
    this.fieldSeeders[name] = fieldSeeder;
  }

  /**
   * seed - Generate array of objects from fixture
   *
   * @param  {Fixture} fixture
   * @return {Array}
   */
  seed (fixture) {
    let elements = [];
    for (var i = 0; i < fixture.quantity; i++) {
      let element = this.generateElement(fixture);
      elements.push(element);
    }
    return elements;
  }


  /**
   * seedAndSave - Read a fixture file, process it and save the output on the destination
   *
   * @param  {string} fixtureFile
   * @param  {string} destination
   */
  seedAndSave(fixtureFile, destination) {
    let that = this;
    fs.readFile(fixtureFile, 'utf8', function (err, data) {
      let fixture = JSON.parse(data);

      console.log("Fixture loaded.");
      console.log("Generating seeded data...");

      let elements = that.seed(fixture);
      that.save(elements, destination);
    });
  }


  /**
   * save - Create a file with the elements on the specified destination.
   *
   * @param  {Array} elements    description
   * @param  {string} destination description
   */
  save(elements, destination) {
    fs.writeFile(destination, JSON.stringify(elements), (error) => {
      if (error)
        console.log(error);
      console.log('File saved');
    });
  }


  /**
   * applyFieldSeeder - Applies the correct FieldSeeder to the object
   *
   * @param  {Object} element
   * @param {FixtureField} field
   */
  applyFieldSeeder (element, field) {
    this.fieldSeeders[field.type].addField(element, field);
  }


  /**
   * generateElement - Create a new GeoData element with the fixture data
   *
   * @param  {Fixture} fixture description
   * @return {GeoData}         description   
   */
  generateElement (fixture) {
    let element = new GeoData(null, {});
    for (let field of fixture.fields) {
      this.applyFieldSeeder(element, field);
    }
    return element;
  }

}

const DefaultSeeders = {
  'bool': new BooleanSeeder(),
  'number': new NumberSeeder(),
  'geo_point': new GeoPointSeeder()
};


module.exports = {
  Seeder,
  DefaultSeeders
};
