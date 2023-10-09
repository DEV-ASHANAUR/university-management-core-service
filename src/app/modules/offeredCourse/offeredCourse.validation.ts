import { z } from 'zod';

const create = z.object({
  body: z.object({
    academicDepartmentId: z.string({
      required_error: 'Academic Department id is Required!',
    }),
    semesterRegistrationId: z.string({
      required_error: 'Semester Reg. is required',
    }),
    courseIds: z.array(
      z.string({
        required_error: 'Course id is required!',
      }),
      {
        required_error: 'Course Ids are required!',
      }
    ),
  }),
});

export const OfferedCourseValidations = {
  create,
};
