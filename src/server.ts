import express from "express";
import cors from "cors";
import { logger } from "./helpers/winston.js";
import { PORT } from "./config/env.js";
import router from "./routes/index.js";

const app = express();

app.use(express.json());

app.use(cors());

app.use('/api', router);

app.listen(PORT, () => {
    logger.info('Server is running on port 3333');
});
