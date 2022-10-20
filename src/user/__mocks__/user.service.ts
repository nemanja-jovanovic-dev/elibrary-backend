import { userStub } from '../test/stubs/user.stub';

export const UserService = jest.fn().mockReturnValue({
    findById: jest.fn().mockReturnValue(userStub()),
    findByEmail: jest.fn().mockReturnValue(userStub()),
    create: jest.fn().mockReturnValue(userStub()),
    _getUserDetails: jest.fn().mockReturnValue(userStub()),
});
