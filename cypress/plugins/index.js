/* eslint-disable no-console */
/// <reference types="cypress" />
// ***********************************************************
// This example plugins/index.js can be used to load plugins
//
// You can change the location of this file or turn off loading
// the plugins file with the 'pluginsFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/plugins-guide
// ***********************************************************

// This function is called when a project is opened or re-opened (e.g. due to
// the project's config changing)
const { exec } = require('child_process');
const util = require('util');
const execPromisify = util.promisify(exec);
/**
 * @type {Cypress.PluginConfig}
 */
module.exports = (on, config) => {
  // `on` is used to hook into various events Cypress emits
  // `config` is the resolved Cypress config
  on('task', {
    log(message) {
      console.log(message);
      return null;
    },
    resetDatabase() {
      return execPromisify('yarn run reset', {
        cwd: '../backend',
        shell: '/bin/bash', // Adjust as necessary for your environment
      })
        .then((result) => {
          console.log(result.stdout);
          return null;
        })
        .catch((error) => {
          console.error('exec error:', error);
          throw new Error(`Reset database failed: ${error}`);
        });
    },
    seedUser() {
      return execPromisify('yarn run seed:user', {
        cwd: '../backend',
        shell: '/bin/bash', // Adjust as necessary for your environment
      })
        .then((result) => {
          console.log(result.stdout);
          return null;
        })
        .catch((error) => {
          console.error('exec error:', error);
          throw new Error(`Seeding user failed: ${error}`);
        });
    },
    seed() {
      return execPromisify('yarn run seed', {
        cwd: '../backend',
        shell: '/bin/bash', // Adjust as necessary for your environment
      })
        .then((result) => {
          console.log(result.stdout);
          return null;
        })
        .catch((error) => {
          console.error('exec error:', error);
          throw new Error(`Seeding failed: ${error}`);
        });
    },
  });
};
// NODE_TLS_REJECT_UNAUTHORIZED=0
