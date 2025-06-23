import winston from 'winston';
import fs from 'fs';
import { NODE_ENV } from '../config/env.js';
import DailyRotateFile from 'winston-daily-rotate-file';

const transports: winston.transport[] = [];

try {
    if (NODE_ENV === 'production') {
        const logDir = 'logs';
        if (!fs.existsSync(logDir)) {
            fs.mkdirSync(logDir);
        }
        transports.push(
            new DailyRotateFile({
                filename: 'logs/error-%DATE%.log',
                datePattern: 'YYYY-MM-DD',
                level: 'error',
                zippedArchive: true,
                maxSize: '20m',
                maxFiles: '30d',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.json()
                )
            }),
            new DailyRotateFile({
                filename: 'logs/app-%DATE%.log',
                datePattern: 'YYYY-MM-DD',
                level: 'info',
                zippedArchive: true,
                maxSize: '20m',
                maxFiles: '30d',
                format: winston.format.combine(
                    winston.format.timestamp(),
                    winston.format.json()
                )
            })
        );
    } else {
        transports.push(new winston.transports.Console());
    }
} catch {
    process.exit(1);
}

export const logger = winston.createLogger({
    level: NODE_ENV === 'development' ? 'debug' : 'info',
    format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message }) => `${timestamp} [${level}]: ${message}`)
    ),
    transports: transports
});