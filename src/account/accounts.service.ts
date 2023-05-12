import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Account } from './account.entity';
import { Repository } from 'typeorm';
import { CreateAccountDto } from './dto/create-account.dto';

@Injectable()
export class AccountsService {
  constructor(
    @InjectRepository(Account)
    private readonly accountsRepository: Repository<Account>,
  ) {}

  findAll() {
    return this.accountsRepository.find();
  }

  async findOne(id: number) {
    const account = await this.accountsRepository.findOne({ where: { id } });
    if (!account) {
      throw new NotFoundException(`Account with #ID "${id}" does not exist.`);
    }

    return account;
  }

  async create(body: CreateAccountDto) {
    const found = await this.findByName(body.name);
    if (found.length > 0) {
      throw new BadRequestException(
        `Account with #name "${body.name}" already exists`,
      );
    }
    const account = this.accountsRepository.create({
      ...body,
      createdOn: new Date(),
    });

    return this.accountsRepository.save(account);
  }

  private findByName(name: string) {
    return this.accountsRepository.find({ where: { name } });
  }

  async update(id: number, body: Partial<Account>): Promise<Account> {
    if (Object.keys(body).length === 0) {
      throw new BadRequestException('Update name or owner');
    }

    const account = await this.findOne(id);
    const updatedAccount: Account = Object.assign(account, body, {
      updatedOn: new Date(),
    });
    await this.accountsRepository.save(updatedAccount);
    return this.findOne(id);
  }

  async remove(id: number) {
    const result = await this.accountsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Account with #ID "${id}" does not exist.`);
    }
  }
}
