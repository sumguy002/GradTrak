import { SemesterPrototype } from './semester.prototype';

export interface UserDataPrototype {
  semesters: SemesterPrototype[];
  goalIds: string[];
  manuallyFulfilledReqs: Map<string, string[]>;
}
