import { JwtService } from "@nestjs/jwt";
import { Test } from "@nestjs/testing";

jest.mock('../auth.service');

describe('Auth service', () => {

    let jwtService: JwtService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [],
            controllers: [JwtService],
            providers: []
        }).compile()

        jwtService = moduleRef.get<JwtService>(JwtService);
        jest.clearAllMocks();
    });

    test('should jwtService be defined', () => {
        expect(jwtService).toBeDefined();
    });
})
