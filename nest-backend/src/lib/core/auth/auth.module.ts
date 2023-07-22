import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DB_ENGINE } from 'src/lib/constant';
import { USER_SCHEMA_NAME, userSchema } from '../user';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './interface/auth.constant';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '15m' },
    }),
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
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
