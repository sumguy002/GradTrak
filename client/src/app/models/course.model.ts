import { CoursePrototype } from 'common/prototypes/course.prototype';
import { Tag } from 'models/tag.model';

/**
 * The Course class represents a course you can take in a {@link Semester} and that fulfills certain {@link Requirement}s.
 */
export class Course {
  id: string;
  dept: string;
  no: string;
  title: string;
  units: number;
  tags: Tag[];

  constructor(proto: CoursePrototype, tagMap: Map<string, Tag>) {
    this.id = proto.id;
    this.dept = proto.dept;
    this.no = proto.no;
    this.title = proto.title;
    this.units = proto.units;
    this.tags = proto.tagIds.map((tagId: string) => tagMap.get(tagId));
  }

  getName(): string {
    return `${this.dept} ${this.no}`;
  }

  toString(): string {
    return `${this.getName()}: ${this.title}`;
  }

  getBareNumber(): number {
    return parseInt(this.no.replace(/[^\d]/g, ''), 10);
  }
}
