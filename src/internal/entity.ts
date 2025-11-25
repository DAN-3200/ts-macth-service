// serão collections separadas

import type { ObjectId } from 'mongodb';

export interface User {
	_id?: ObjectId | string;
	name: string;
	email: string;
	password: string;
	interests: string[];
	createdAt?: Date;
}

export interface Organization {
	_id?: ObjectId | string;
	name: string;
	description?: string;
	contactEmail: string;
	createdAt?: Date;
}

export interface Opportunity {
	_id?: ObjectId | string;
	title: string;
	description?: string;
	tags: string[];
	createdAt?: Date;
	// FOREIGN KEY pra ajudar na busca
	fkOrganization: ObjectId | string;
	fkUser?: ObjectId | string;
}
