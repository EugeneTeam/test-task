import { Exclude, Expose } from 'class-transformer';
import { CitiesPopulationResponse } from './cities-population.response';
import { CitiesMembersResponse } from './cities-members.response';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class CitiesListResponse {
  @ApiProperty({
    isArray: true,
    type: CitiesPopulationResponse,
  })
  @Expose()
  cities_population: CitiesPopulationResponse[];

  @ApiProperty({
    isArray: true,
    type: CitiesMembersResponse,
  })
  @Expose()
  city_members: CitiesMembersResponse[];

  constructor({ city_members, cities_population }: CitiesListResponse) {
    this.cities_population = cities_population?.map(
      (i) => new CitiesPopulationResponse(i),
    );
    this.city_members = city_members?.map((i) => new CitiesMembersResponse(i));
  }
}
