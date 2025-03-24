// import { startServer } from './server'; 
// startServer();
import { join } from "path";
import dotenv from "dotenv";
import express from "express";
dotenv.config({ path: join(process.cwd(), process.argv[2]) });
import { log, errorLog } from "./src/utils/helpers";
const appRoute = express();
import middlewares from "./src/middleware";
import Routes from "./src/routes";
const PORT = Number(3000);
import errorHandler from "./src/middleware/errorHandler";
import db from "./src/models";
declare global {
    namespace Express {
        interface Request {
            user?: any; // You can replace 'any' with a more specific type if you want.
        }
    }
}
middlewares(appRoute).then(async (app: any) => {
    app.use(errorHandler);
            Routes(app)
            app.listen(PORT, async () => {
                log(`Example app listening on port ${PORT}`);
                // log(`DB connection success!, DB -> ${'process.env.DATABASE_NAME'}`);
            });
            process.on("unhandledRejection", (error) => {
                // Will print "unhandledRejection err is not defined"
                console.log("unhandledRejection", error);
                console.log("unhandledRejection", error);
            });
            process.on('SIGINT', async () => {
                console.log('Received SIGINT, shutting down gracefully...');
                try {
                    // Close the Sequelize connection pool
                    await db.sequelize.close()
                    console.log('Sequelize connection pool closed.');
                } catch (err) {
                    console.error('Error closing Sequelize connection pool:', err);
                } finally {
                    // You can also perform any other cleanup here if needed
                    // Exit the process after cleanup
                    process.exit(0);  // Exit with status code 0 (successful termination)
                }
            });
}).catch((e) => {
    errorLog(e, "====> Error on db connection");
});


