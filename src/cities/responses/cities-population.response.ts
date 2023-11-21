import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from "@nestjs/swagger";

@Exclude()
export class CitiesPopulationResponse {
  @ApiProperty()
  @Expose()
  city: string;

  @ApiProperty()
  @Expose()
  count: number;

  constructor({ city, count }: CitiesPopulationResponse) {
    this.city = city;
    this.count = count;
  }
}
