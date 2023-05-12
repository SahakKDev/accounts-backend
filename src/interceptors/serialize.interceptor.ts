import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  UseInterceptors,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { plainToClass } from 'class-transformer';
import { Account } from 'src/account/account.entity';

// any class
interface ClassConstructor {
  new (...args: any[]): {};
}

export const Serialize = () => UseInterceptors(new SerializeInterceptor());

@Injectable()
export class SerializeInterceptor implements NestInterceptor {
  intercept(_context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data?: Account | Account[]) => {
        if (!data) {
          return;
        }
        if (!Array.isArray(data)) {
          return this.filterAccount(data);
        }

        return data.map((account) => this.filterAccount(account));
      }),
    );
  }

  private filterAccount(account: Account) {
    if (!account.updatedOn) {
      const copy = Object.assign(account);
      delete copy.updatedOn;

      return copy;
    }

    return account;
  }
}
