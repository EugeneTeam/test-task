import { Controller, Get, Query } from '@nestjs/common';
import { CitiesService } from './cities.service';
import {
  ApiOkResponse,
  ApiOperation,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { CitiesListResponse } from './responses/cities-list.response';

@ApiTags('cities')
@Controller('cities')
export class CitiesController {
  constructor(private readonly citiesService: CitiesService) {}

  @ApiOkResponse({
    type: CitiesListResponse,
    description: 'Get a list of cities',
  })
  @ApiOperation({
    summary: 'Get a list of cities',
  })
  @ApiQuery({
    type: String,
    name: 'search',
    required: false,
  })
  @Get('')
  async getAllCities(
    @Query('search') search?: string,
  ): Promise<CitiesListResponse> {
    try {
      const result = await this.citiesService.getCities(search);
      return new CitiesListResponse(result);
    } catch (e) {
      throw new Error(e);
    }
  }
}
