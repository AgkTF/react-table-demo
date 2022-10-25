import { faker } from '@faker-js/faker';
import { Tract } from '../types';

function createRandomTract(): Tract {
  return {
    id: faker.datatype.uuid(),
    tractNumber: faker.datatype.number(),
    isActive: faker.datatype.boolean(),
    basinShortName: faker.datatype.string(3),
    stateShortName: faker.address.stateAbbr(),
    countyName: faker.address.county(),
    township: faker.random.alphaNumeric(4),
    range: faker.random.alphaNumeric(3),
    section: faker.datatype.string(2),
    blockNumber: faker.random.alphaNumeric(4),
    abstractNumber: faker.random.alphaNumeric(4),
    legal: faker.lorem.sentence(),
    tractOwner: faker.helpers.arrayElement([
      'Raisa II, LLC',
      'Raisa II Minerals, LLC',
      'Raisa III, LLC',
      'Raisa III Minerals, LLC',
      'Savitar Energy Working Interests, LLC',
      'Savitar Energy Minerals, LLC',
    ]),
    ownershipStatus: faker.helpers.arrayElement(['Leased', 'Failed']),
    interestType: faker.helpers.arrayElement(['WI', 'ORRI', 'MI']),
    grossAcres: faker.datatype.number(),
    netAcres: faker.datatype.number(),
    deliveredNRI: faker.datatype.number(),
    costPerAcre: faker.datatype.number(),
    instrumentType: faker.helpers.arrayElement([
      'Oil&Gas Lease',
      'Assignment',
      'Mineral Deed',
    ]),
    assigneeOrGrantee: faker.company.name(),
    assignorOrGrantor: faker.company.name(),
    recordingNumber: faker.random.numeric(6),
    recordingDate: faker.date.past(),
    effectiveDate: faker.date.past(),
    lessee: faker.company.name(),
    lessor: faker.company.name(),
    leaseRecordingNumber: faker.random.numeric(6),
    leaseRecordingDate: faker.date.past(),
    leaseEffectiveDate: faker.date.past(),
    leasePrimaryTerm: faker.datatype.number({ max: 10, min: 0 }),
    leaseOptionTerm: faker.datatype.number({ max: 10, min: 0 }),
    sourceDealTract: faker.random.alphaNumeric(),
    percentageOfTractDivested: faker.datatype.number({ max: 100, min: 0 }),
  };
}

export function createTracts(length: number) {
  return new Array(length).fill(createRandomTract());
}

export function createTractsInRange(max: number, min: number) {
  const random = Math.floor(Math.random() * (max - min + 1) + min);
  return createTracts(random);
}
