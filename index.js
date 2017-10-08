#!/usr/bin/env node
'use strict';
/**
 * Module dependencies.
 */
const program                     = require('commander');
const { processPuntosDigitales }  = require('./elasticmanager');
const { generateRandomPoints }    = require('./geo');

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
    console.log("seeding...");
  });

program.parse(process.argv);
