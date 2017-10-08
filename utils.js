const { LatLong } = require('./datatypes');

/**
 * Random - Random generator
 */
class Random {

  /**
   * @static getFloat - The maximum is exclusive and the minimum is inclusive.
   *
   * @param  {number} min
   * @param  {number} max
   * @return {number}     float
   */
  static getFloat (min, max) {
    return Math.random() * (max - min) + min;
  }

  /**
   * @static getInt - The maximum is exclusive and the minimum is inclusive.
   *
   * @param  {number} min
   * @param  {number} max
   * @return {number}     int
   */
  static getInt (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }


  /**
   * @static getIntInclusive - The maximum is inclusive and the minimum is inclusive.
   *
   * @param  {number} min
   * @param  {number} max
   * @return {number}     int
   */
  static getIntInclusive (min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * @static getBoolean - Returns a random bool.
   *
   * @return {bool}
   */
  static getBoolean () {
    return Math.random() >= 0.5;
  }

  /**
  * Generates number of random geolocation points given a center and a radius.
  * Reference URL: http://goo.gl/KWcPE.
  * @param  {LatLong} center A JS object with lat and lon attributes.
  * @param  {number} radius Radius in meters.
  * @return {LatLong} The generated random points as JS object with lat and lon attributes.
  */
  static getGeoPoint(center, radius) {
    var x0 = center.lon;
    var y0 = center.lat;
    // Convert Radius from meters to degrees.
    var rd = radius/111300;

    var u = Math.random();
    var v = Math.random();

    var w = rd * Math.sqrt(u);
    var t = 2 * Math.PI * v;
    var x = w * Math.cos(t);
    var y = w * Math.sin(t);

    var xp = x/Math.cos(y0);

    // Resulting point.
    return new LatLong(y+y0, xp+x0);
  }
}

module.exports = {
  Random
};
