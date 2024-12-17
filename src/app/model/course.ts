export interface ICourse {
  title: string;
  teacher: string;
  courseCode: string;
}

export class Course implements ICourse {
  title: string;
  teacher: string;
  courseCode: string;

  constructor(title: string, courseCode: string, teacher: string) {
    this.title = title;
    this.courseCode = courseCode;
    this.teacher = teacher;
  }
}
