import { Module } from '@nestjs/common';

import { CitiesModule } from './cities/cities.module';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { ContextInterceptor } from './cities/interceptors/context.interceptor';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), CitiesModule, HttpModule],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ContextInterceptor,
    },
  ],
})
export class AppModule {}
