import { Resolver, Query, Mutation, Args, ResolveReference } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { CreateUserInput, UpdateUserInput } from '../graphql';

import { IQuery, IMutation } from 'src/graphql';

import { lvtLogger } from '../logger';

@Resolver('User')
export class UsersResolver implements IQuery, IMutation {
  constructor(private readonly usersService: UsersService) {}

  @Mutation('createUser')
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    lvtLogger.info('Logging manually in resolver: Creating user!', { createUserInput });
    return this.usersService.create(createUserInput);
  }

  @Query('users')
  users() {
    return this.usersService.findAll();
  }

  @Query('user')
  user(@Args('id') id: number) {
    return this.usersService.findOne(id);
  }
  
  @Query('error')
  error(): boolean | Promise<boolean> {
    throw new Error('This is a test error');
  }

  @Mutation('updateUser')
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    lvtLogger.info('Logging manually in resolver: Updating user!', { updateUserInput });
    const result = this.usersService.update(updateUserInput);
    return result;
  }

  @Mutation('removeUser')
  removeUser(@Args('id') id: number) {
    lvtLogger.info('Logging manually in resolver: Removing user!', { id });
    return this.usersService.remove(id);
  }

  @ResolveReference()
  resolveReference(reference: { __typename: string; id: number }) {
    return this.usersService.findOne(reference.id);
  }
}
