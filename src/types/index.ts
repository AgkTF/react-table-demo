import { TableOptions } from '@tanstack/react-table';
import { ConfigObjBuilder } from '../utils';

export type InterestType = 'WI' | 'ORRI' | 'MI';
export type InstrumentType = 'Oil&Gas Lease' | 'Assignment' | 'Mineral Deed';
export type Tract = {
  id: string;
  tractNumber: number;
  isActive: boolean;
  basinShortName?: string;
  stateShortName?: string;
  countyName?: string;
  township?: string;
  range?: string;
  section?: string;
  blockNumber?: string;
  surveyNumber?: string;
  abstractNumber?: string;
  legal: string;
  tractOwner: string;
  ownershipStatus: string;
  interestType?: InterestType;
  grossAcres?: number;
  netAcres?: number;
  deliveredNRI?: number;
  costPerAcre?: number;
  instrumentType: InstrumentType;
  assignorOrGrantor: string;
  assigneeOrGrantee: string;
  recordingNumber?: string;
  recordingDate?: string | Date;
  effectiveDate?: string | Date;
  lessor: string;
  lessee: string;
  leaseRecordingNumber?: string;
  leaseRecordingDate?: string | Date;
  leaseEffectiveDate?: string | Date;
  leasePrimaryTerm?: number;
  leaseOptionTerm?: number;
  sourceDealTract?: string;
  percentageOfTractDivested: number;
};
export type ColsGroupState = 'visible' | 'hidden';
export type SelectedCell = {
  cellId: string;
  cellData: unknown;
};
export type OffsetValues = {
  mainHeadersOffsets: number[];
  subHeadersOffsets: number[];
};
export type ColVisibilityState = 'visible' | 'hidden';
export type DSU = {
  id: string;
  wellAPI: string;
  operatorShortName: string;
  acres: number;
  lateralLength: number;
  formations: string;
  lastModifiedDate: string;
  basin: string;
  state: string;
  county: string;
  location: string;
  taggingAuthor?: string;
  taggedDate?: string;
};
export type TableMW<T> = (
  configObj?: ConfigObjBuilder<T>
) => ConfigObjBuilder<T> | ConfigObjBuilder<T>;

export type MWReturn<T> = (
  configObj?: Partial<TableOptions<T>>
) => Partial<TableOptions<T>>;
