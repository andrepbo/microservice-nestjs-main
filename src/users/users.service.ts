import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './users.model';
import { Model } from 'mongoose';
import { CreateUserDto } from 'src/dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<UserDocument>
    ) { }

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdUser = new this.userModel(createUserDto);
        return createdUser.save();
    }

    async update(id: number, user: User): Promise<User> {
        return this.userModel.findOneAndUpdate({ id }, user);
    }

    async delete(id: number): Promise<User> {
        return this.userModel.findOneAndDelete({ id });
    }
}
