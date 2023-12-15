import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.getOrThrow('PG_HOST'),
        port: configService.getOrThrow('PG_PORT'),
        database: configService.getOrThrow('PG_DATABASE'),
        username: configService.getOrThrow('PG_USERNAME'),
        password: configService.getOrThrow('PG_PASSWORD'),
        autoLoadEntities: true,
        synchronize: configService.getOrThrow('PG_SYNCHRONIZE'),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}
