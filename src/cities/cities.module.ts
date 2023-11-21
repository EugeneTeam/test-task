import { Module } from '@nestjs/common';
import { ConnectModule } from '../connect/connect.module';
import { CitiesService } from './cities.service';
import { CitiesController } from './cities.controller';
import { CitiesRepository } from './cities.repository';

@Module({
  imports: [ConnectModule],
  providers: [CitiesService, CitiesRepository],
  controllers: [CitiesController],
})
export class CitiesModule {}
