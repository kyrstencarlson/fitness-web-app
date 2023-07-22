import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_ENGINE } from 'src/lib/constant';
import { USER_SCHEMA_NAME } from './interface/user.constant';
import { userSchema } from './interface/user.schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: USER_SCHEMA_NAME,
          schema: userSchema,
        },
      ],
      DB_ENGINE,
    ),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
