import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/Entity/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: 'adfafs',
      signOptions: {
        algorithm: 'HS512',
        expiresIn: 'id'
      }
    }),
    PassportModule.register({
      defaultStrategy: 'jwt'
    })
  ],
  controllers: [AuthController],
  providers: [AuthService]
})
export class AuthModule {}
