import Express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { routesManager } from './routes';
import session from 'express-session';

export default async function runServer() {
	const server = Express();
	const port = 8000;

	server.use(Express.json(), morgan('dev'), cors());
	routesManager(server);

	server.use(
		session({
			secret: 'CHAVE-CHAVOSAAAAA',
			resave: false,
			saveUninitialized: false,
			cookie: {
				maxAge: 1000 * 60 * 30, // 30 minutos
				secure: false, // true se estiver usando HTTPS
			},
		})
	);

	server.listen(port, () => {
		console.clear();
		console.log(`\nserver running [http://localhost:${port}/] \n`);
	});
}
