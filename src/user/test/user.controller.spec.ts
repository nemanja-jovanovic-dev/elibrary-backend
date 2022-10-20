import { Test } from '@nestjs/testing';
import { UserDetails } from '../user-details.interface';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { userStub } from './stubs/user.stub';

jest.mock('../user.service');

describe('UserController', () => {
	let userController: UserController;
	let userService: UserService;

	beforeEach(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [],
			controllers: [UserController],
			providers: [UserService],
		}).compile();

		userController = moduleRef.get<UserController>(UserController);
		userService = moduleRef.get<UserService>(UserService);
		jest.clearAllMocks();
	});

	describe('getUser', () => {
		describe('when getUser is called', () => {
			let user: UserDetails;

			beforeEach(async () => {
				user = await userController.getUser(userStub().id);
			});

			test('then it should call usersService', () => {
				expect(userService.findById).toBeCalledWith(userStub().id);
			});

            test('then it should return user', () => {
                expect(user).toEqual(userStub());
            })
		});
	});
});
