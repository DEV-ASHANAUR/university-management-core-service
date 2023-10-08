export const semesterRegistrationFilterableFields: string[] = [
  'searchTerm',
  'id',
  'academicsemesterId',
];

export const semesterRegistrationSearchableFields: string[] = [];

export const semesterRegistrationRelationalFields: string[] = [
  'academicSemesterId',
];
export const semesterRegistrationRelationalFieldMapper: {
  [key: string]: string;
} = {
  academicSemesterId: 'academicSemester',
};
