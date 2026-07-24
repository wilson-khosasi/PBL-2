import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import docsRoutes from '@/docs/docsRoutes.js';
import routes from '@/routes/routes.js';
import { globalErrorHandler } from '@/middleware/errorMiddleware.js';

const app = express();
const port = process.env.PORT || 8000;
const shouldEnableApiDocs = process.env.ENABLE_API_DOCS === 'true';

app.use(express.json());
app.use(cors());

if (shouldEnableApiDocs) {
   app.use('/api', docsRoutes);
}
app.use('/api', routes);
app.use(globalErrorHandler);

app.listen(port, () => {
   console.log(`Server is running at http://localhost:${port}`);
});
