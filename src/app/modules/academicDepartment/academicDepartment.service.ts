/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcademicDepartment, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  EVENT_ACADEMIC_DEPARTMENT_CREATED,
  EVENT_ACADEMIC_DEPARTMENT_DELETED,
  EVENT_ACADEMIC_DEPARTMENT_UPDATED,
  academicDepartmentFilterableFields,
} from './academicDepartment.constants';

import { RedisClient } from '../../../shared/redis';
import { IAcademicDepartmentFilters } from './academicDepartment.interface';

const create = async (
  academicDepartmentData: AcademicDepartment
): Promise<AcademicDepartment> => {
  const isExist = await prisma.academicDepartment.findFirst({
    where: {
      title: academicDepartmentData.title,
    },
  });

  if (isExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Academic Department is already exist!'
    );
  }

  const result = await prisma.academicDepartment.create({
    data: academicDepartmentData,
  });

  if (result) {
    await RedisClient.publish(
      EVENT_ACADEMIC_DEPARTMENT_CREATED,
      JSON.stringify(result)
    );
  }

  return result;
};

const getAllFromDB = async (
  filters: IAcademicDepartmentFilters,
  options: IPaginationOptions
) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: academicDepartmentFilterableFields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditions.push({
      AND: Object.keys(filterData).map(key => ({
        [key]: {
          equals: (filterData as any)[key],
        },
      })),
    });
  }

  const whereConditions: Prisma.AcademicDepartmentWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.academicDepartment.findMany({
    include: {
      academicFaculty: true,
    },
    where: whereConditions,
    skip,
    take: limit,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });

  const total = await prisma.academicDepartment.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.findUnique({
    where: { id },
    include: { academicFaculty: true },
  });

  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<AcademicDepartment>
): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.update({
    where: { id },
    data: payload,
  });

  if(result){
    await RedisClient.publish(EVENT_ACADEMIC_DEPARTMENT_UPDATED,JSON.stringify(result));
  }

  return result;
};

const deleteByIdFromDB = async (
  id: string
): Promise<AcademicDepartment | null> => {
  const result = await prisma.academicDepartment.delete({
    where: { id },
  });

  if(result){
    await RedisClient.publish(EVENT_ACADEMIC_DEPARTMENT_DELETED,JSON.stringify(result));
  }

  return result;
};

export const AcademicDepartmentService = {
  create,
  getAllFromDB,
  getDataById,
  deleteByIdFromDB,
  updateOneInDB,
};
