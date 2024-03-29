import { UuidMother } from 'core';
import { LoginHandler } from '../../../../src/User/application/Login/LoginHandler';
import { LoginQuery } from '../../../../src/User/application/Login/LoginQuery';
import { AuthService } from '../../../../src/User/domain/AuthService';
import { IdentifyBy } from '../../../../src/User/domain/IdentifyBy';
import { IncorrectPassword } from '../../../../src/User/domain/IncorrectPassword';
import { UserNotExist } from '../../../../src/User/domain/UserNotExist';
import { JWTAuthService } from '../../../../src/User/infrastructure/service/JWTAuthService';
import { MockUserRepository } from '../../__mocks__/MockUserRepository';
import { UserMother } from '../../domain/UserMother';

describe('LoginHandler', () => {
  let userRepository: MockUserRepository;
  let authService: AuthService;
  let handler: LoginHandler;

  beforeEach(() => {
    userRepository = new MockUserRepository();
    authService = new JWTAuthService(UuidMother.hash());
    handler = new LoginHandler(userRepository, authService);
  });

  it('should login a user', async () => {
    const user = UserMother.create();
    const query = new LoginQuery(user.email.value, user.password.value);
    user.password.encrypt();

    userRepository.returnOnGetUserByCriteria(user);
    const response = await handler.handle(query);

    userRepository.assertGetUserByCriteriaHaveBeenCalledWith(new IdentifyBy('email', user.email.value));
    expect(response).toEqual({
      token: authService.generateToken(user),
      user: user.toPrimitives(),
    });
  });

  it('should be incorrect password error throws', async () => {
    const user = UserMother.create();
    const query = new LoginQuery(user.email.value, 'invalid-password');
    user.password.encrypt();

    userRepository.returnOnGetUserByCriteria(user);
    await expect(handler.handle(query)).rejects.toBeInstanceOf(IncorrectPassword);
  });

  it('should be incorrect password error throws', async () => {
    const query = new LoginQuery('correo', 'invalid-password');
    userRepository.returnOnGetUserByCriteria(null);
    await expect(handler.handle(query)).rejects.toBeInstanceOf(UserNotExist);
  });
});
