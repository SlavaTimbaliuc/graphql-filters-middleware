import winston from 'winston';
import { lvtLoggerDefaultOptions, simpleFormat, winstonToLvtLogger } from '@lvt/logger/winston';

const options = lvtLoggerDefaultOptions("Sample GraphQL User App");
options.format = simpleFormat();

export const lvtLogger = winstonToLvtLogger(winston.createLogger(options));
