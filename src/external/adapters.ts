import bcrypt from 'bcryptjs';
import type { User } from '../internal/entity';

export async function hashPassword(base: string): Promise<string> {
	const tamanho = 10;
	const passowordHash = await bcrypt.hash(base, tamanho);
	return passowordHash;
}

export async function checkPassword(
	pivot: string,
	passwordhash: string
): Promise<boolean> {
	return await bcrypt.compare(pivot, passwordhash);
}

declare module 'express-session' {
	interface SessionData {
		user?: {
			id: string;
			name: string;
			email: string;
			password: string;
		};
	}
}
