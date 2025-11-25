import Express from 'express';
import { UsecaseLayer } from '../internal/usecase';
import { connMongoDB } from './conndb';
import { ControllerLayer } from './controllers';
import { RepositoryLayer } from './repository';

export async function routesManager(server: Express.Application) {
	const repository = new RepositoryLayer(await connMongoDB());
	const service = new UsecaseLayer(repository);
	const handle = new ControllerLayer(service);

	server.post('/api/auth/register', handle.register);
	server.post('/api/auth/login', handle.login);
	server.get('/api/users/me', handle.infoMeUser);

	server.post('/api/organizations', handle.saveOrganizations);
	server.get('/api/organization/:id', handle.getInfoOrganization);
	server.put('/api/organization/:id', handle.editOrganization);

	server.post('/api/opportunities', handle.saveOpportunities);
	server.get('/api/opportunities', handle.getOpportunityList);
	server.get('/api/opportunities/match', handle.matchmakingOpportunities);
	server.post('/api/opportunities/:id/apply', handle.applyOpportunity);

	server.get('/api/users/my-applications', handle.meApplys);
}
