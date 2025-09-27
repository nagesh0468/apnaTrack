import app from './app';
import { sequelize } from './models';
import config from './config';

const port = parseInt(config.port as string, 10);

async function start() {
  try {
    await sequelize.authenticate();
    console.log('DB connected');
    //  await sequelize.sync({ alter: true });
    // Only sync in development if you want: await sequelize.sync();
    app.listen(port, () => console.log(`Server running on ${port}`));
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

start();
