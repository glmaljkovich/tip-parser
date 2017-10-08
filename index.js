#!/usr/bin/env node
'use strict';
/**
 * Module dependencies.
 */
const program                     = require('commander');
const { processPuntosDigitales, bulkIndexData }  = require('./elasticmanager');
const { Seeder, DefaultSeeders }  = require('./seeder');

// Puntos Digitales
program
  .version('0.1.1')
  .command('puntos-digitales <file>')
  .description('Add the Puntos Digitales in the specified file to ElasticSearch')
  .action(function(file){
    processPuntosDigitales(file);
  });

// Seeder
program
  .command('seed <fixture> <output>')
  .description('Create a seeded output file with the fixture fields')
  .action(function(fixture, output){
    let seeder = new Seeder(DefaultSeeders);
    seeder.seedAndSave(fixture, output);
  });

program
  .command('bulk-index <file>')
  .description('Uploads a JSON file containing an Array of GeoData to ElasticSearch.')
  .action(function(file){
    bulkIndexData(file);
  });

program.parse(process.argv);
