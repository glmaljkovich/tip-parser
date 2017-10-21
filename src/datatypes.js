// DATA TYPES
function ESIndexOp (type, index) {
  this.index = {};
  this.index._index = index;
  this.index._type = type;
}



/**
 * LatLong - An object with latitude and longitude
 *
 * @param  {number} lat  latitude
 * @param  {number} long longitude
 * @return {LatLong} a point
 */
function LatLong (lat, long) {
  this.lat = lat;
  this.lon = long;
}

function GeoData (location, data) {
  this.location = location;
  this.data = data;
}


/**
 * Fixture - A Seeder Fixture
 *
 * @param  {number} quantity number of objects to be created by a Seeder
 * @param  {Array} fields   fields with format {name: }
 * @return {Fixture}          description
 */
function Fixture(quantity, fields){
  this.quantity = quantity;
  this.fields = fields;
}

/**
 * FixtureField - A Fixture Field for a Seeder
 *
 * @param  {string} name    field name
 * @param  {string} type    field type
 * @param  {Object} options options for this type of field
 * @return {FixtureField}
 */
function FixtureField(name, type, options){
  this.name = name;
  this.type = type;
  this.options = options || {};
}

module.exports = {
  ESIndexOp,
  LatLong,
  GeoData,
  Fixture,
  FixtureField
};
