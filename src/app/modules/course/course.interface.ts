export type ICourseCreateData = {
  title: string;
  code: string;
  credits: number;
  preRequisiteCourses: IPrerequisiteCourseRequest[];
};

export type IcourseFilterRequest = {
  searchTerm?: string | undefined;
};

export type IPrerequisiteCourseRequest = {
  courseId: string;
  isDeleted?: boolean;
};
