import { Exclude, Expose } from 'class-transformer';
import { MembersResponse } from './members.response';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class CitiesMembersResponse {
  @ApiProperty()
  @Expose()
  city: string;

  @ApiProperty({
    isArray: true,
    type: MembersResponse,
  })
  @Expose()
  members: MembersResponse[];

  constructor({ city, members }: CitiesMembersResponse) {
    this.city = city;
    this.members = members?.map((i) => new MembersResponse(i));
  }
}
