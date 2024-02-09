import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Users } from 'src/TypeOrm/user.entity';
import { AuthGuard } from './auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@Module({
  imports: [JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => ({
      secret: configService.get('SECRET'),
      signOptions: {expiresIn: '1h'}
    }),
    inject: [ConfigService]
  }), TypeOrmModule.forFeature([Users])],
  providers: [UserService, AuthGuard],
  controllers: [UserController],
})
export class UserModule {}
