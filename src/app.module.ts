import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import entites from './TypeOrm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configservice: ConfigService) => ({
        type: 'postgres',
        host: configservice.get('DB_HOST'),
        port: +configservice.get<number>('DB_PORT'),
        username: configservice.get('DB_USERNAME'),
        password: configservice.get('DB_PASSWORD'),
        database: configservice.get('DB_NAME'),
        entities: entites,
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
