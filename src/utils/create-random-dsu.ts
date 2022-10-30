import { faker } from '@faker-js/faker';
import { DSU } from '../types';

function createRandomDsu(): DSU {
  return {
    id: faker.datatype.uuid(),
    acres: faker.datatype.number(),
    basin: faker.random.alpha({ casing: 'upper', count: 3 }),
    county: faker.address.county(),
    formations: faker.helpers.arrayElement([
      'NIOBRARA',
      'PERMIAN',
      'CODELL',
      'MADISON',
      'BIRDBEAR',
    ]),
    lastModifiedDate: new Intl.DateTimeFormat('en-US').format(
      faker.date.past()
    ),
    lateralLength: faker.datatype.number({ max: 200 }),
    location: faker.random.alphaNumeric(10),
    operatorShortName: faker.company.name(),
    state: faker.address.stateAbbr(),
    wellAPI: faker.random.numeric(14),
    taggedDate: new Intl.DateTimeFormat('en-US').format(faker.date.past()),
    taggingAuthor: faker.name.fullName(),
  };
}

export function createDsus(length: number): DSU[] {
  return Array.from({ length }, createRandomDsu);
}
