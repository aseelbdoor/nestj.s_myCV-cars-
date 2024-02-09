import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ReportModule } from './report/report.module';
import { User } from './user/user.entity';
import { Report } from './report/report.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      // host: 'localhost',
      // port: 5000,
      // username: 'aseelCars',
      // password: '123456789',
      database: 'db.sqlite',
      entities: [User, Report],
      synchronize: true,
    }),
    UserModule, ReportModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
