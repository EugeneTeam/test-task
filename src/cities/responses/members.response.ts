import { Exclude, Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

@Exclude()
export class MembersResponse {
  @ApiProperty()
  @Expose()
  first_name: string;

  @ApiProperty()
  @Expose()
  count: number;

  constructor({ first_name, count }: MembersResponse) {
    this.first_name = first_name;
    this.count = count;
  }
}
