import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDetails } from './user-details.interface';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

    _getUserDetails(user: UserDocument | any): UserDetails {
        return {
            id: user._id,
            name: user.name,
            email: user.email
        }
    }

    async create(name: string, email: string, hashPassword: string): Promise<UserDocument> {
        const newUser = new this.userModel({
          name,
          email,
          password: hashPassword,
        });

        return newUser.save();
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        return this.userModel.findOne({email}).exec();
    }

    async findById(id: string): Promise<UserDetails | null> {
        const user = this.userModel.findById(id).exec();

        if (!user) {
            return null;
        }

        return this._getUserDetails(user);
    }
}
