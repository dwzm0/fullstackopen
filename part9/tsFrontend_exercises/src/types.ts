interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescrip  extends CoursePartBase{
  description: string;
}

interface CoursePartBasic extends CoursePartDescrip {
  kind: "basic"
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group"
}

interface CoursePartBackground extends CoursePartDescrip {
  backgroundMaterial: string;
  kind: "background"
}

interface CourcePartSpecial extends CoursePartDescrip {
  requirements: string[],
  kind: "special"
}

export type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CourcePartSpecial