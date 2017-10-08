const { GeoData } = require('./datatypes');

function Seeder(fieldSeeders){
  this.fieldSeeders = fieldSeeders || {};
}

/**
 * addFieldSeeder - Add a FieldSeeder with name to the dictionary
 *
 * @param  {string} name FieldSeeder name
 * @param  {FieldSeeder} fieldSeeder
 */
Seeder.prototype.addFieldSeeder = function (name, fieldSeeder) {
  this.fieldSeeders[name] = fieldSeeder;
};

/**
 * seed - Generate array of objects from fixture
 *
 * @param  {Fixture} fixture
 * @return {Array}
 */
Seeder.prototype.seed = function (fixture) {
  let elements = [];
  for (var i = 0; i < fixture.quantity; i++) {
    let element = this.generateElement(fixture);
    elements.push(element);
  }
  return elements;
};


/**
 * applyFieldSeeder - Applies the correct FieldSeeder to the object
 *
 * @param  {Object} element
 * @param {FixtureField} field
 */
Seeder.prototype.applyFieldSeeder = function (element, field) {
  this.fieldSeeders[field.type].addField(element, field);
};

Seeder.prototype.generateElement = function (fixture) {
  let element = new GeoData(null, {});
  for (let field of fixture) {
    this.applyFieldSeeder(element, field);
  }
  return element;
};

const DefaultSeeders = {
  'bool': new BooleanSeeder(),
  'number': new NumberSeeder(),
  'geo_point': new GeoPointSeeder()
}

module.exports = {
  Seeder,
  DefaultSeeders
};
