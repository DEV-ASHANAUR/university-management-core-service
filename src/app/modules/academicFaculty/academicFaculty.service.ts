/* eslint-disable @typescript-eslint/no-explicit-any */
import { AcademicFaculty, Prisma } from '@prisma/client';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import { EVENT_ACADEMIC_FACULTY_CREATED, EVENT_ACADEMIC_FACULTY_DELETED, EVENT_ACADEMIC_FACULTY_UPDATED, academicFacultySearchableFields } from './academicFaculty.constants';

import { RedisClient } from '../../../shared/redis';
import { IAcademicFacultyFilters } from './academicFaculty.interface';

const createAcademicFaculty = async (
  academicFacultyData: AcademicFaculty
): Promise<AcademicFaculty> => {
  const isExist = await prisma.academicFaculty.findFirst({
    where: {
      title: academicFacultyData.title,
    },
  });

  if (isExist) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'Academic Faculty is already exist!'
    );
  }

  const result = await prisma.academicFaculty.create({
    data: academicFacultyData,
  });
  if (result) {
    await RedisClient.publish(
      EVENT_ACADEMIC_FACULTY_CREATED,
      JSON.stringify(result)
    );
  }
  return result;
};

const getAllFromDB = async (
  filters: IAcademicFacultyFilters,
  options: IPaginationOptions
) => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;
  const andConditions = [];

  if (searchTerm) {
    andConditions.push({
      OR: academicFacultySearchableFields.map(field => ({
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

  const whereConditions: Prisma.AcademicFacultyWhereInput =
    andConditions.length > 0 ? { AND: andConditions } : {};

  const result = await prisma.academicFaculty.findMany({
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

  const total = await prisma.academicFaculty.count();

  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getDataById = async (id: string): Promise<AcademicFaculty | null> => {
  const result = await prisma.academicFaculty.findUnique({ where: { id } });

  return result;
};

const updateOneInDB = async (
  id: string,
  payload: Partial<AcademicFaculty>
): Promise<AcademicFaculty | null> => {
  const result = await prisma.academicFaculty.update({
    where: { id },
    data: payload,
  });
  if (result) {
    await RedisClient.publish(
      EVENT_ACADEMIC_FACULTY_UPDATED,
      JSON.stringify(result)
    );
  }
  return result;
};

const deleteByIdFromDB = async (
  id: string
): Promise<AcademicFaculty | null> => {
  const result = await prisma.academicFaculty.delete({
    where: { id },
  });
  if (result) {
    await RedisClient.publish(
      EVENT_ACADEMIC_FACULTY_DELETED,
      JSON.stringify(result)
    );
  }
  return result;
};

export const AcademicFacultyService = {
  createAcademicFaculty,
  getAllFromDB,
  getDataById,
  updateOneInDB,
  deleteByIdFromDB,
};
