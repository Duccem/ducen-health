import {
  FileLogger,
  MongoArranger,
  MongoConnection,
  MongoConnectionMother,
  UuidMother,
} from 'core';
import { IdentifyBy } from '../../../src/User/domain/IdentifyBy';
import { UserRepository } from '../../../src/User/domain/UserRepository';
import { MongoUserRepository } from '../../../src/User/infrastructure/persistance/MongoDB/MongoUserRepository';
import { UserMother } from '../domain/UserMother';

describe('MongoUserRepository', () => {
  let connection: MongoConnection;
  let arranger: MongoArranger;
  let userRepository: UserRepository;

  beforeAll(async () => {
    connection = await MongoConnectionMother.create();
    arranger = new MongoArranger(connection);
    userRepository = new MongoUserRepository(
      connection,
      new FileLogger({ environment: 'test', serviceName: 'test' })
    );
  });

  afterAll(async () => {
    await arranger.arrange();
    await connection.client.close();
  });

  beforeEach(async () => {
    await arranger.arrange();
  });

  it('should save a member and find it by id', async () => {
    const user = UserMother.create();
    await userRepository.save(user.id, user);
    const savedUser = await userRepository.getUserByCriteria(new IdentifyBy('id', user.id.value));
    expect(savedUser).toEqual(user);
  });

  it('should get null on search by id', async () => {
    const savedUser = await userRepository.getUserByCriteria(
      new IdentifyBy('id', UuidMother.random())
    );
    expect(savedUser).toEqual(null);
  });

  it('should save a member and find it by email', async () => {
    const user = UserMother.create();
    await userRepository.save(user.id, user);
    const savedUsers = await userRepository.listUsersByCriteria();
    expect(savedUsers).toEqual([user]);
  });

  it('should get null on search by email', async () => {
    const savedUsers = await userRepository.listUsersByCriteria();
    expect(savedUsers).toEqual([]);
  });
});
