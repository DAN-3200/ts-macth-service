import type { Opportunity, Organization, User } from './entity';

export interface Ports {
	// User ---------------------------------------------------------------------------------------------
	registerUser(info: User): Promise<User>;
	loginUser(name: string): Promise<User | null>;
	infoMeUser(id: string): Promise<User | null>;
	meApplys(userId: string): Promise<Opportunity[]>;

	// Organization ---------------------------------------------------------------------------------------------
	saveOrganizations(info: Organization): Promise<Organization>;
	getInfoOrganization(id: string): Promise<Organization | null>;
	editOrganization(id: string, info: Partial<Organization>): Promise<void>;

	// Opportunity ---------------------------------------------------------------------------------------------
	saveOpportunities(info: Opportunity): Promise<Opportunity>;
	getOpportunityList(): Promise<Opportunity[]>;
	applyOpportunity(opportunityId: string, userId: string): Promise<void>;
	matchmakingOpportunities(userId: string): Promise<Opportunity[]>; // EIXO da aplicação Matchmaking
}
