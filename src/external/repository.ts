import { ObjectId, type Collection, type MongoClient } from 'mongodb';
import type { Organization, User, Opportunity } from '../internal/entity';
import type { Ports } from '../internal/ports';

export class RepositoryLayer implements Ports {
	private users: Collection<User> | undefined;
	private organizations: Collection<Organization> | undefined;
	private opportunities: Collection<Opportunity> | undefined;

	constructor(private conn: MongoClient) {
		this.init(this.conn);
	}

	async init(conn: MongoClient) {
		const db = conn.db('dbmain');

		const collectionsToCreate = ['users', 'organizations', 'opportunities'];

		const existing = await db.listCollections().toArray();
		const existingNames = new Set(existing.map((c) => c.name));

		for (const name of collectionsToCreate) {
			if (!existingNames.has(name)) {
				await db.createCollection(name);
			}
		}

		this.users = db.collection<User>('users');
		this.organizations = db.collection<Organization>('organizations');
		this.opportunities = db.collection<Opportunity>('opportunities');
	}

	// User ---------------------------------------------------------------------------------------------

	async registerUser(info: User): Promise<User> {
		await this.users!.insertOne(info);
		return info;
	}

	async loginUser(name: string): Promise<User | null> {
		return await this.users!.findOne({ name: name });
	}

	async infoMeUser(id: string): Promise<User | null> {
		return this.users!.findOne({ _id: new ObjectId(id) });
	}

	async meApplys(userId: string): Promise<Opportunity[]> {
		return await this.opportunities!.find({ fkUser: userId }).toArray();
	}

	// Organization ---------------------------------------------------------------------------------------------

	async saveOrganizations(info: Organization): Promise<Organization> {
		await this.organizations!.insertOne(info);
		return info;
	}

	async getInfoOrganization(id: string): Promise<Organization | null> {
		return await this.organizations!.findOne({ _id: new ObjectId(id) });
	}

	async editOrganization(
		id: string,
		info: Partial<Organization>
	): Promise<void> {
		await this.organizations?.updateOne({ _id: new ObjectId(id) }, { $set: info });
	}

	// Opportunity ---------------------------------------------------------------------------------------------

	async saveOpportunities(info: Opportunity): Promise<Opportunity> {
		await this.opportunities!.insertOne(info);
		return info;
	}

	async getOpportunityList(): Promise<Opportunity[]> {
		return await this.opportunities!.find().toArray();
	}

	async matchmakingOpportunities(userId: string): Promise<Opportunity[]> {
		const user = await this.users!.findOne({ _id: new ObjectId(userId) });
		if (!user) return [];

		return this.opportunities!.find({
			tags: { $in: user.interests },
		}).toArray();
	}

	async applyOpportunity(opportunityId: string, userId: string): Promise<void> {
		await this.opportunities?.updateOne(
			{ _id: new ObjectId(opportunityId) },
			{ $set: { fkUser: new ObjectId(userId) } }
		);
	}
}
