import prisma from '../../utils/prisma';
import bcrypt from 'bcrypt';
import {CreateUserInput, UpdateUserInput} from './user.schema';
import {Prisma} from '@prisma/client';

const userService = {
    // Create a new user
    async create(input: CreateUserInput) {
        try {
            const { password, ...rest } = input;

            // Generate a random salt
            const saltRounds = 10;
            const salt = await bcrypt.genSalt(saltRounds);

            // Hash the password with the generated salt
            const hash = await bcrypt.hash(password, salt);

            // Create the user with hashed password and salt
            return await prisma.user.create({
                data: {...rest, password: hash, salt},
            });
        } catch (e) {
            console.error('Error creating user:', e);
            throw e;
        }
    },

    // Get all users
    async getAll() {
        try {
            return await prisma.user.findMany({
                select: {
                    email: true,
                    username: true,
                    userId: true,
                },
            });
        } catch (e) {
            console.error('Error retrieving all users:', e);
            throw e;
        }
    },

    // Get user by ID
    async getById(Id: number) {
        try {
            const user = await prisma.user.findUnique({
                where: {
                    userId: Id,
                },
                select: {
                    email: true,
                    username: true,
                    userId: true,
                },
            });

            if (!user) {
                throw new Error(`User with ID ${Id} not found`);
            }

            return user;
        } catch (e) {
            console.error(`Error retrieving user with ID ${Id}:`, e);
            throw e;
        }
    },

    // Update user by ID
    async update (Id: number, data: UpdateUserInput) {
        try {
            // Hash the new password if provided
            if (data.password) {
                const saltRounds = 10;
                const salt = await bcrypt.genSalt(saltRounds);
                data.password = await bcrypt.hash(data.password, salt);
            }

            // Prepare the update data
            const userData: Prisma.UserUpdateInput = {
                ...(data.email && { email: data.email }),
                ...(data.username && { username: data.username }),
                ...(data.password && { password: data.password }),
            };

            // Update the user in the database
            const updatedUser = await prisma.user.update({
                where: { userId: Id },
                data: userData,
            });

            if (!updatedUser) {
                throw new Error(`User with ID ${Id} not found`);
            }

            return updatedUser;
        } catch (e) {
            console.error(`Error updating user with ID ${Id}:`, e);
            throw e;
        }
    },

    async delete(Id: number) {
        try {
            const deleteUser = await prisma.user.delete({
                where: {
                    userId: Id,
                },
            });

            if (!deleteUser) {
                throw new Error(`User with ID ${Id} not found`);
            }

            return `User with ID ${Id} was deleted successfully`;
        } catch (e) {
            console.error(`Error deleting user with ID ${Id}:`, e);
            throw e;
        }
    },
};

export default userService;
