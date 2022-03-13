// @ts-check

/**
 * @module
 * Entry point for Google Cloud Functions
 */

const pino = require("pino");
const pinoDebug = require("pino-debug");
const { default: defaultPinoConf } = require("./lib/pino-stackdriver");

// Setup logging before importing other modules
const logger = pino(defaultPinoConf);
pinoDebug(logger);

const { default: app } = require("./lib/app");

// see the following if having logging issues, pino logs can be adapted to google log explorer:
// https://github.com/pinojs/pino/blob/master/docs/help.md#stackdriver
logger.info("Bootstrapping cloud function");

exports.app = async (req, res) => {
  await server.load(app);
  return server.expressApp(req, res);
};