import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { AuthModule } from './auth/auth.module';

const ormOptions: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'database-1.co7uq1hxu43x.sa-east-1.rds.amazonaws.com',
  port: 3306,
  username: 'admin',
  password: 'Manga2450',
  database: 'DatabaseOne',
  autoLoadEntities: true,
  synchronize: true,
  insecureAuth: true
};
@Module({
  imports: [TodoModule, TypeOrmModule.forRoot(ormOptions), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
