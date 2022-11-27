import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserDetails } from './user-details.interface';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UserService {
	constructor(
		@InjectModel(User.name) private readonly userModel: Model<UserDocument>,
	) {}

	_getUserDetails(user: UserDocument): UserDetails {
		return {
			id: user._id,
			name: user.name,
			email: user.email,
		};
	}

	async create(
		name: string,
		email: string,
		hashPassword: string,
	): Promise<UserDocument> {
		const newUser = new this.userModel({
			name,
			email,
			password: hashPassword,
		});

		return newUser.save();
	}

	async findByEmail(email: string): Promise<UserDocument | null> {
		return this.userModel.findOne({ email }).exec();
	}

	async findById(id: string): Promise<UserDetails | null> {
		let user: UserDocument;

		try {
			user = await this.userModel.findById(id).exec();
		} catch (err) {
			throw new HttpException(
				{ status: HttpStatus.NOT_FOUND, error: 'Invalid user id' },
				HttpStatus.NOT_FOUND,
			);
		}

		return this._getUserDetails(user);
	}
}
