import { Course } from './course.model';
import { Constraint } from './constraint.model';

/**
 * The Requirement class represents a single requirement that can be fulfilled by taking certain {@link Course}s and is
 * either fulfilled or unfulfilled based on the input {@link Course}s.
 */
export abstract class Requirement {
  id: string;
  name: string;
  constraints: Constraint[];

  constructor(obj: object) {
    // FIXME Constraints
    Object.assign(this, obj);
  }

  /* Requirement.fromProto is currently RequirementCategory.reqFromProto to
   * avoid circular dependencies. */

  // TODO Make override optional
  isFulfilled(courses: Course[], override: Set<string>): boolean {
    if (override && override.has(this.id)) {
      return true;
    }
    return this.isFulfilledWith(courses, override);
  }

  abstract isFulfilledWith(courses: Course[], override: Set<string>): boolean;

  getAnnotation(): string {
    return null;
  }

  abstract toString(): string;

  getConstraints(): Constraint[] {
    return this.constraints ? this.constraints : [];
  }

  /**
   * Given a course, returns whether the course has any possibility of
   * contributing to to the requirement.
   */
  abstract canFulfill(course: Course): boolean;

  /**
   * Given a list of COURSES, returns a 2d array. Each element in the 2d array
   * is an array of courses which potentially fullfill part or all of the requirement.
   */
  abstract getCourseCombinations(courses: Course[]): Set<Course>[];
}
