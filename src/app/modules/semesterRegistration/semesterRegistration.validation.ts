import { SemesterRegistrationStatus } from '@prisma/client';
import { z } from 'zod';

const create = z.object({
  body: z.object({
    startDate: z.string({
      required_error: 'Start Date is Required!',
    }),
    endDate: z.string({
      required_error: 'End Date is Required!',
    }),
    academicSemesterId: z.string({
      required_error: 'academicSemesterId is Required!',
    }),
    minCredit: z.number({
      required_error: 'minCredit is Required!',
    }),
    maxCredit: z.number({
      required_error: 'maxCredit is Required!',
    }),
  }),
});

const update = z.object({
  body: z.object({
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    academicSemesterId: z.string().optional(),
    minCredit: z.number().optional(),
    maxCredit: z.number().optional(),
    status: z
      .enum(
        [...Object.values(SemesterRegistrationStatus)] as [string, ...string[]],
        {}
      )
      .optional(),
  }),
});

export const SemesterRegistrationZodValidation = {
  create,
  update,
};
