import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { CatsModule } from './cats/cats.module';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    // MongooseModule.forRootAsync('mongodb://test:test@localhost:27017'),
    MongooseModule.forRootAsync({
      useFactory: async () => ({
        uri: `mongodb://${configuration().database.username}:${configuration().database.password}@${configuration().database.host}:${configuration().database.port}`,
      }),
    }),
    CatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
