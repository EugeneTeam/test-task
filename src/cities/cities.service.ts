import { Injectable } from '@nestjs/common';
import { CitiesRepository } from './cities.repository';
import { CitiesListResponse } from './responses/cities-list.response';
import { CitiesMembersResponse } from './responses/cities-members.response';
import { CitiesPopulationResponse } from './responses/cities-population.response';

@Injectable()
export class CitiesService {
  constructor(private readonly citiesRepository: CitiesRepository) {}

  async getCities(search?: string): Promise<CitiesListResponse> {
    const rows = await this.citiesRepository.getCities(search);

    const data = this.transformData(rows);

    return data;
  }

  private transformData(rows): CitiesListResponse {
    const cities_population: CitiesPopulationResponse[] = [];
    const city_members: CitiesMembersResponse[] = [];

    rows?.forEach((info) => {
      const cityName = info.name;
      const residentName = info.first_name;
      const residentCount = info.resident_count;

      cities_population.push({
        city: info.name,
        count: Number(info.cities_count),
      });

      const member = city_members.find((i) => i.city === cityName);
      if (member && residentName) {
        member.members.push({
          first_name: residentName,
          count: residentCount,
        });
        city_members.push(member);
      } else {
        city_members.push({
          city: cityName,
          members: residentName
            ? [{ first_name: residentName, count: residentCount }]
            : [],
        });
      }
    });

    return {
      cities_population,
      city_members,
    }
  }
}
