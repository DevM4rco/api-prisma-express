import express, { Express, Request, Response } from 'express';
import { prismaClient } from '../db/prismaClient';
import { UserInterface } from '../interfaces/User.interface';

class UsersControllers {
	private app: Express;

	constructor() {
		this.app = express();
	}

	async getAllUsers(req: Request<{}, {}, UserInterface>, res: Response) {
		const users = await prismaClient.user.findMany();

		return res.status(200).send(users);
	}

	async getUserById(req: Request<{ id: string }>, res: Response) {
		const { id } = req.params;

		const userSelected = await prismaClient.user.findUnique({ where: { id } });

		if (userSelected) {
			return res.send(userSelected);
		}

		return res.send({ error: 'Usuário não encontrado' });
	}

	async createUser(req: Request<{}, {}, UserInterface>, res: Response) {
		const { name, email, password } = req.body;
		await prismaClient.user.create({ data: { name, email, password } });

		return res.send({ name, email, password });
	}

	async updateUser(
		req: Request<{ id: string }, {}, UserInterface>,
		res: Response,
	) {
		const { name, email, password } = req.body;
		const { id } = req.params;

		const userUpdated = await prismaClient.user.update({
			data: { name, email, password },
			where: { id },
		});

		return res.send({ userUpdated });
	}

	async deleteUser(req: Request<{ id: string }>, res: Response) {
		const { id } = req.params;
		const userDeleted = await prismaClient.user.delete({ where: { id } });

		return res.send({ userDeleted });
	}
}

export const usersControllers = new UsersControllers();
