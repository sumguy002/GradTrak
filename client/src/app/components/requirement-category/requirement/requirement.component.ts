import { Component, Input, OnInit } from '@angular/core';
import { Course } from 'models/course.model';
import { Requirement } from 'models/requirement.model';
import { MultiRequirement } from 'models/requirements/multi-requirement.model';
import { MutexRequirement } from 'models/requirements/mutex-requirement.model';
import { UnitRequirement } from 'models/requirements/unit-requirement.model';

@Component({
  selector: '[app-requirement]',
  templateUrl: './requirement.component.html',
  styleUrls: ['./requirement.component.css', '../requirement-category.component.css'],
})
export class RequirementComponent implements OnInit {
  @Input() requirement: Requirement;
  @Input() courses: Course[];

  constructor() {}

  ngOnInit(): void {}

  isMulti(): boolean {
    return this.requirement instanceof MultiRequirement && !this.requirement.hidden;
  }

  getMulti(): MultiRequirement {
    return this.isMulti() ? (this.requirement as MultiRequirement) : null;
  }

  isMutex(): boolean {
    return this.requirement instanceof MutexRequirement;
  }

  getMutex(): MutexRequirement {
    return this.isMutex() ? (this.requirement as MutexRequirement) : null;
  }

  getMutexFulfillment(reqFulfillment: { requirement: Requirement; fulfillment: number }): string {
    switch (reqFulfillment.fulfillment) {
      case MutexRequirement.FULFILLED:
        return 'fulfilled';
      case MutexRequirement.POTENTIAL:
        return 'potential';
      default:
        return 'unfulfilled';
    }
  }

  isUnit(): boolean {
    return this.requirement instanceof UnitRequirement;
  }

  getUnit(): UnitRequirement {
    return this.isUnit() ? (this.requirement as UnitRequirement) : null;
  }

  // TODO TSX?
  getAnnotation(): string {
    // FIXME Remove check for getAnnotation
    if (this.requirement.getAnnotation) {
      let annotation: string = this.requirement.getAnnotation();
      if (annotation) {
        annotation = annotation.replace(/\n/g, '<br />');
      }
      return annotation;
    }
    return null;
  }
}
