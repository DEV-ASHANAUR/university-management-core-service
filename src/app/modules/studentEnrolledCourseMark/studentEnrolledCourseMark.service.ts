/* eslint-disable @typescript-eslint/no-explicit-any */
import { ExamType, PrismaClient } from "@prisma/client";
import { DefaultArgs, PrismaClientOptions } from "@prisma/client/runtime/library";

const createStudnetEnrolledCourseDefaultMark = async (
  prismaClient: Omit<
    PrismaClient<PrismaClientOptions, never, DefaultArgs>,
    '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
  >,
  payload: {
    studentId: string;
    studentEnrolledCourseId: string;
    academicSemesterId: string;
  }
) => {
  const isExistMidtermData = await prismaClient.studentEnrolledCourseMark.findFirst({
    where:{
      examType: ExamType.MIDTERM,
      student:{
        id: payload.studentId
      },
      studentEnrolledCourse:{
        id: payload.studentEnrolledCourseId
      },
      academicSemester:{
        id:payload.academicSemesterId
      }
    }
  })

  if(!isExistMidtermData){
    await prismaClient.studentEnrolledCourseMark.create({
      data:{
        student:{
          connect:{
            id:payload.studentId
          }
        },
        studentEnrolledCourse:{
          connect:{
            id: payload.studentEnrolledCourseId
          }
        },
        academicSemester:{
          connect:{
            id: payload.academicSemesterId
          }
        },
        examType:ExamType.MIDTERM
      }
    })
  }

  const isExistFianlData = await prismaClient.studentEnrolledCourseMark.findFirst({
    where:{
      examType: ExamType.FINAL,
      student:{
        id: payload.studentId
      },
      studentEnrolledCourse:{
        id: payload.studentEnrolledCourseId
      },
      academicSemester:{
        id:payload.academicSemesterId
      }
    }
  })

  if(!isExistFianlData){
    await prismaClient.studentEnrolledCourseMark.create({
      data:{
        student:{
          connect:{
            id:payload.studentId
          }
        },
        studentEnrolledCourse:{
          connect:{
            id: payload.studentEnrolledCourseId
          }
        },
        academicSemester:{
          connect:{
            id: payload.academicSemesterId
          }
        },
        examType:ExamType.FINAL
      }
    })
  }

};

const updateStudentMarks =async (payload:any) => {
  console.log(payload)
}



export const StudentEnrolledCourseMarkService = {
  createStudnetEnrolledCourseDefaultMark,
  updateStudentMarks
}