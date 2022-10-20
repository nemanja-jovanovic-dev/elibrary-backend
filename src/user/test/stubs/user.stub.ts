import { UserDetails } from 'src/user/user-details.interface';

export const userStub = (): UserDetails => ({
    id: '123',
    email: 'johndoe@gmail.com',
    name: 'John Doe',
});
