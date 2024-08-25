import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { EventPattern } from '@nestjs/microservices';
import { User } from './users.model';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

    @Get()
    async all() {
        return this.usersService.all();
    }

    @EventPattern('user_created')
    async handleUserCreated(user: User) {
        console.log('user_created Event received: ', user);
        await this.usersService.create(user);
    }

    @EventPattern('user_updated')
    async handleUserUpdated(user: User) {
        console.log('user_updated Event received: ', user);
        await this.usersService.update(user.id, user);
    }

    @EventPattern('user_deleted')
    async handleUserDeleted(id: number) {
        console.log('user_deleted Event received: ', id);
        await this.usersService.delete(id);
    }
}
