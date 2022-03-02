/* eslint-disable no-restricted-globals */
const lib = require('./lib.js');

const argv = require('yargs/yargs')(process.argv.slice(2))
  .option('token', { description: 'token', type: 'string' })
  .option('owner', { description: 'owner', type: 'string' })
  .option('expire-in', { default: '14days', description: 'Human readable expire duration', type: 'string' })
  .help().argv;

lib.purgeArtifacts(argv.token, argv.owner).catch(console.error);
