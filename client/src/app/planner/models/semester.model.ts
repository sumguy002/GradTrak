import { SemesterPrototype } from 'common/prototypes/semester.prototype';
import { Course } from './course.model';

/**
 * The Semester class represents a single term in which a certain number of {@link Course}s can be taken.
 */
export class Semester {
  name: string;
  courses: Course[];

  constructor(name: string, courses: Course[] = []) {
    this.name = name;
    this.courses = courses;
  }

  static fromProto(proto: SemesterPrototype, coursesMap: Map<string, Course>): Semester {
    return new Semester(
      proto.name,
      proto.courseIds.map((courseId: string) => coursesMap.get(courseId)),
    );
  }
}
