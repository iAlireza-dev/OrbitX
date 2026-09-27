import { UserService } from './user.service.js';

import { Module } from '@nestjs/common';

@Module({
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
