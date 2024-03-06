import express from 'express';
import adminRouter from './routes/admin.js'
import userManagementRouter from './routes/userManagement.js'
import bodyParser from 'body-parser';
import { PORT } from './config/index.js';

const app = express();

app.use(bodyParser.json());
app.use('/admin', adminRouter);
app.use('/', userManagementRouter);

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
})