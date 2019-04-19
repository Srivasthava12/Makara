import express from 'express';
import Parser from 'body-parser';
import Boom from 'express-boom';
import cors from 'cors';
import DotEnv from 'dotenv';
import { Log, LogMiddleware } from './services/log';

import Router from './routes';

//express
const app = express();

//EnvironmentVariables
DotEnv.load();

const port = process.env.PORT || 3000;

// Add cors Middleware
app.use(cors());

//body-parser
app.use(
	Parser.json({
		limit: '50mb'
	})
);

//express-boom
app.use(Boom());

//For Logs
app.use(LogMiddleware);

// Add The Routes
Router.build(app);


//Listen to Port
app.listen(port, '0.0.0.0', (err) => {
	if (err) {
		Log.info(err);
	} else {
		Log.info('Server started on: ', port);
	}
});

module.exports = app;
