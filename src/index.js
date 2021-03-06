#!/usr/bin/env node
'use strict';
/**
 * Module dependencies.
 */
const program                                     = require('commander');
const ElasticManager                              = require('./elasticmanager');
const { Seeder, DefaultSeeders }                  = require('./seeder');

// Puntos Digitales
program
  .version('0.1.1')
  .command('puntos-digitales <file>')
  .description('Add the Puntos Digitales in the specified file to ElasticSearch')
  .action(function(file){
    new ElasticManager().processPuntosDigitales(file);
  });

program
  .command('villas <file>')
  .description('Add the Villas in the specified file to ElasticSearch')
  .action(function(file){
    new ElasticManager('villas', 'villas').processVillas(file);
  });

program
  .command('censo <file>')
  .description('Add the Censo in the specified file to ElasticSearch')
  .action(function(file){
    new ElasticManager('censo', 'censo2010').processCenso(file);
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
  .command('bulk-index <index> <type> <file>')
  .description('Uploads a JSON file containing an Array of GeoData to the ElasticSearch type.')
  .action(function(index, type, file){
    new ElasticManager(index, type).bulkIndexData(file);
  });

program.parse(process.argv);
