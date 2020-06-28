import { ConstraintPrototype } from 'common/prototypes/constraint.prototype';
import { Constraint } from '../constraint.model';
import { Course } from '../course.model';
import { Requirement } from '../requirement.model';

/**
 * The MutexConstraint class defines a {@link Constraint} that only allows courses to be assigned to a single
 * requirement.
 */
export class MutexConstraint extends Constraint {
  /**
   * The requirements that are mutually exclusive in terms of classes.
   */
  private mutexReqs: Set<Requirement>;

  constructor(mutexReqs: Set<Requirement>) {
    super();
    this.mutexReqs = mutexReqs;
  }

  /**
   * Constructs a MutexConstraint from a ConstraintPrototype and its
   * requirement set's mapping of IDs to requirements.
   *
   * @param {ConstraintPrototype} proto The prototype.
   * @param {Map<string, Requirement>} reqMap The map of requirement IDs to
   * requirements for the requirement set the constraint belongs to.
   * @return {MutexConstraint} The constructed constraint.
   */
  static fromProto(proto: ConstraintPrototype, reqMap: Map<string, Requirement>): MutexConstraint {
    return new MutexConstraint(new Set<Requirement>(proto.mutexReqIds.map((reqId: string) => reqMap.get(reqId))));
  }

  /**
   * Returns true if and only if the requirements in {@link MutexConstraint#mutexReqs} are fulfilled with unique
   * courses.
   */
  isValidMapping(mapping: Map<Requirement, Set<Course> | boolean>): boolean {
    const mutexCourses: Set<Course> = new Set<Course>();
    let valid: boolean = true;
    this.mutexReqs.forEach((req: Requirement) => {
      if (mapping.has(req)) {
        const courses: Set<Course> | boolean = mapping.get(req);
        if (typeof courses === 'boolean') {
          return;
        }
        courses.forEach((course: Course) => {
          if (mutexCourses.has(course)) {
            valid = false;
          }
          mutexCourses.add(course);
        });
      }
    });
    return valid;
  }
}
