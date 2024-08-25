import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.model';
import { Model } from 'mongoose';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>
    ) { }

    async all(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async create(data: { username: string, email: string, password: string }): Promise<User> {
        const user = new this.userModel(data);
        return user.save();
    }
}
