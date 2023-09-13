/* eslint-disable @typescript-eslint/no-explicit-any */
import { Prisma, Room } from '@prisma/client';
import { paginationHelpers } from '../../../helpers/paginationHelper';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import prisma from '../../../shared/prisma';
import {
  roomRelationalFields,
  roomRelationalFieldsMapper,
  roomsSearchablefields,
} from './room.constant';
import { IRoomFilterRequest } from './room.interface';

const insertIntoDB = async (data: Room) => {
  const result = await prisma.room.create({
    data,
    include: { building: true },
  });
  return result;
};

const getAllFromDB = async (
  filters: IRoomFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Room[]>> => {
  const { page, limit, skip } = paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filterData } = filters;

  const andConditons = [];

  if (searchTerm) {
    andConditons.push({
      OR: roomsSearchablefields.map(field => ({
        [field]: {
          contains: searchTerm,
          mode: 'insensitive',
        },
      })),
    });
  }

  if (Object.keys(filterData).length > 0) {
    andConditons.push({
      AND: Object.keys(filterData).map(key => {
        if (roomRelationalFields.includes(key)) {
          return {
            [roomRelationalFieldsMapper[key]]: {
              id: (filterData as any)[key],
            },
          };
        } else {
          return {
            [key]: {
              equals: (filterData as any)[key],
            },
          };
        }
      }),
    });
  }

  const whereConditons: Prisma.RoomWhereInput =
    andConditons.length > 0 ? { AND: andConditons } : {};

  const result = await prisma.room.findMany({
    include: {
      building: true,
    },
    skip,
    take: limit,
    where: whereConditons,
    orderBy:
      options.sortBy && options.sortOrder
        ? {
            [options.sortBy]: options.sortOrder,
          }
        : {
            createdAt: 'desc',
          },
  });
  const total = await prisma.room.count({
    where: whereConditons,
  });

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getByIdFromDB = async (id: string): Promise<Room | null> => {
  const result = await prisma.room.findUnique({
    where: {
      id,
    },
    include: {
      building: true,
    },
  });

  return result;
};

const updateIntoDB = async (
  id: string,
  payload: Partial<Room>
): Promise<Room | null> => {
  const result = await prisma.room.update({
    where: {
      id,
    },
    data: payload,
    include: {
      building: true,
    },
  });

  return result;
};

const deleteIntoDB = async (id: string): Promise<Room | null> => {
  const result = await prisma.room.delete({
    where: {
      id,
    },
    include: {
      building: true,
    },
  });

  return result;
};

export const RoomService = {
  insertIntoDB,
  getAllFromDB,
  getByIdFromDB,
  updateIntoDB,
  deleteIntoDB,
};
