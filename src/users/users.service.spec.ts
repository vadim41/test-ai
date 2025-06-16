import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User } from './user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let repo: Repository<User>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get(UsersService);
    repo = module.get(getRepositoryToken(User));
  });

  it('should create user', async () => {
    const saveSpy = jest.spyOn(repo, 'save').mockResolvedValue({ id: 1, name: 'test' } as User);
    const result = await service.create({ name: 'test' });
    expect(saveSpy).toHaveBeenCalled();
    expect(result.name).toBe('test');
  });
});
