import { Inject, Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class CitiesRepository {
  constructor(@Inject('CONNECTION') private readonly pg: Pool) {}

  async getCities(search: string): Promise<any[]> {
    const client = await this.pg.connect();

    try {
      const result = await client.query(
        `
      SELECT 
        cities.name, residents.first_name, 
        COUNT(residents.id) AS resident_count,
        COUNT(cities.id) AS cities_count
      FROM cities 
      LEFT JOIN residents ON cities.id = residents.city_id
      ${search ? 'WHERE cities.name LIKE $1' : ''}
      GROUP BY cities.name, residents.first_name
      ;
      `,
        search ? [`%${search}%`] : []);

      return result.rows;
    } finally {
      client.release();
    }
    return [];
  }
}
