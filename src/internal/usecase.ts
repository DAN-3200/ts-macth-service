import { checkPassword, hashPassword } from '../external/adapters';
import type { Opportunity, Organization, User } from './entity';
import type { Ports } from './ports';

export class UsecaseLayer {
	constructor(private repo: Ports) {}

	// User ---------------------------------------------------------------------------------------------

	async login(name: string, password: string): Promise<User | null> {
		const user = await this.repo.loginUser(name);

		if (!user) throw new Error('Usuário não encontrado');
		if (!(await checkPassword(password, user.password))) {
			throw new Error('Senha não é igual');
		}

		return user;
	}

	async registerUser(info: User): Promise<User> {
		const userMolde: User = {
			name: info.name,
			email: info.email,
			password: await hashPassword(info.password),
			interests: info.interests,
			createdAt: new Date(),
		};

		return await this.repo.registerUser(userMolde);
	}

	async infoMeUser(id: string): Promise<User | null> {
		return await this.repo.infoMeUser(id);
	}

	async meApplys(userId: string): Promise<Opportunity[]> {
		return this.repo.meApplys(userId);
	}

	// Organization ---------------------------------------------------------------------------------------------

	async saveOrganizations(info: Organization): Promise<Organization> {
		return await this.repo.saveOrganizations({
			...info,
			createdAt: new Date(),
		});
	}

	async getInfoOrganization(id: string): Promise<Organization | null> {
		return await this.repo.getInfoOrganization(id);
	}

	async editOrganization(
		id: string,
		info: Partial<Organization>
	): Promise<void> {
		await this.repo.editOrganization(id, info);
	}

	// Opportunity ---------------------------------------------------------------------------------------------
   
	async saveOpportunities(info: Opportunity): Promise<Opportunity> {
		return await this.repo.saveOpportunities({
			...info,
			createdAt: new Date(),
		});
	}

	async getOpportunityList(): Promise<Opportunity[]> {
		return await this.repo.getOpportunityList();
	}

	async applyOpportunity(opportunityId: string, userId: string): Promise<void> {
		await this.repo.applyOpportunity(opportunityId, userId);
	}

	async matchmakingOpportunities(userId: string): Promise<Opportunity[]> {
		return this.repo.matchmakingOpportunities(userId);
	}
}
