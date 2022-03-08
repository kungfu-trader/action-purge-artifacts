/* eslint-disable no-restricted-globals */
const { boolean } = require('yargs');
const lib = require('./lib.js');

const argv = require('yargs/yargs')(process.argv.slice(2))
  .option('token', { description: 'token', type: 'string' })
  .option('owner', { description: 'owner', type: 'string' })
  .option('expire-in', { default: '14days', description: 'Human readable expire duration', type: 'string' })
  .option('only-prefix', { default: '', description: 'owner', type: 'string' })
  .option('except-prefix', { default: '', description: 'owner', type: 'string' })
  .option('dry', { type: boolean })
  .help().argv;

lib.setOpts(argv);
lib.purgeArtifacts(argv.token, argv.owner, argv.expireIn, argv.onlyPrefix, argv.exceptPrefix).catch(console.error);
