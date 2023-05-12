import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';

@Controller('accounts')
@Serialize()
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.accountsService.findOne(id);
  }

  @Post()
  create(@Body() account: CreateAccountDto) {
    return this.accountsService.create(account);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() body: UpdateAccountDto) {
    return this.accountsService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.accountsService.remove(id);
  }
}
