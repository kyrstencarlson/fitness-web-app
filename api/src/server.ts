import * as express from 'express';
import { connect } from './database/database';

const app = express();

const PORT = process.env.PORT || 4000;

app.listen(PORT, async () => {
    console.log(`Server started on http://localhost:${PORT}`);

    await connect();
});

