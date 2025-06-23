import { PrismaClient } from "@prisma/client";
import { logger } from "../helpers/winston.js";
import { NODE_ENV } from "./env.js";

// Singleton para garantir única instância do PrismaClient
let prismaInstance: PrismaClient | null = null;

function getPrismaInstance(): PrismaClient {
    if (!prismaInstance) {
        prismaInstance = new PrismaClient({
            log: NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
        });

        if (NODE_ENV === 'development') {
            (prismaInstance as any).$on('query', (e: any) => {
                logger.debug(`[Prisma] Query: ${e.query}`);
                logger.debug(`[Prisma] Params: ${e.params}`);
                logger.debug(`[Prisma] Duration: ${e.duration}ms`);
            });
        }
    }
    return prismaInstance;
}

export default getPrismaInstance();