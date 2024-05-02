import { Injectable, NotFoundException } from '@nestjs/common';
import { User, CreateUserInput, UpdateUserInput } from '../graphql';
import { lvtLogger } from '../logger';

@Injectable()
export class UsersService {
  private users: User[] = [];
  private userIdCounter = 1;

  create(createUserInput: CreateUserInput): User {
    lvtLogger.info('Logging manually in service: Creating user!', { createUserInput });

    const newUser: User = {
      id: this.userIdCounter++,
      firstName: createUserInput.firstName,
      lastName: createUserInput.lastName,
    };
    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }

  update(updateUserInput: UpdateUserInput): User {
    lvtLogger.info('Logging manually in service: Updating user!', { updateUserInput });

    const user = this.users.find(user => user.id === updateUserInput.id);
    if (!user) {
      throw new NotFoundException(`User with id ${updateUserInput.id} not found`);
    }

    if (updateUserInput.firstName !== undefined) {
      user.firstName = updateUserInput.firstName;
    }

    if (updateUserInput.lastName !== undefined) {
      user.lastName = updateUserInput.lastName;
    }

    return user;
  }

  remove(id: number): number {
    lvtLogger.info('Logging manually in service: Removing user!', { id });
    
    const index = this.users.findIndex(user => user.id === id);
    if (index === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    this.users.splice(index, 1);
    return id;
  }
}