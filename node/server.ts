import express, { Express } from 'express';
import morgan from 'morgan';
import routes from './src/routes/route';
import db from './src/models';
const app: Express = express();
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'origin, X-Requested-With,Content-Type,Accept, Authorization');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET PATCH DELETE POST');
    return res.status(200).json({});
  }
  next();
});
app.use('/api', routes);
app.use('/',(req, res, next) => {
  const error = new Error('not found');
  return res.status(404).json({
    message: error.message
  }); 
});
export const startServer = (): void => {
  app.listen(3000, () => {
    console.log(`Server is running on http://localhost:${3000}`);
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
  });
};