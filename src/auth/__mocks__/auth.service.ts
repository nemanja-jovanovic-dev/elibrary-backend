import { userStub } from "src/user/test/stubs/user.stub";

export const AuthService = jest.fn().mockReturnValue({
    register: jest.fn().mockReturnValue(userStub()),
    validateUser: jest.fn().mockReturnValue(userStub()),
    login: jest.fn().mockReturnValue('token')
})