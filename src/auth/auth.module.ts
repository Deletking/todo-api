import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from 'src/Entity/user.entity';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtCustomStrategy } from './jwt.custom.strategy';

@Module({
  imports: [ 
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.register({
      secret: 'secretkeykeykey',
      signOptions: {
        algorithm: 'HS512',
        expiresIn: 'id'
      }
    }),
    PassportModule.register({
      defaultStrategy: 'jwt'
    })
  ],
  providers: [AuthService, JwtCustomStrategy],
  controllers: [AuthController],
  exports: [PassportModule, JwtCustomStrategy]
})
export class AuthModule {}
