import { Router } from 'express';
import { usersControllers } from '../controllers/users.controllers';

export const usersRoutes = Router();

usersRoutes.get('/', usersControllers.getAllUsers);
usersRoutes.get('/:id', usersControllers.getUserById);
usersRoutes.post('/', usersControllers.createUser);
usersRoutes.put('/:id', usersControllers.updateUser);
usersRoutes.delete('/:id', usersControllers.deleteUser);
