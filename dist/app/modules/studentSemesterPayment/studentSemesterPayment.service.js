"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentSemesterPaymentService = void 0;
const createSemesterPayment = (prismaClient, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prismaClient.studentSemesterPayment.findFirst({
        where: {
            student: {
                id: payload.studentId,
            },
            academicSemester: {
                id: payload.academicSemesterId,
            },
        },
    });
    if (!isExist) {
        const dataToInsert = {
            studentId: payload.studentId,
            academicSemesterId: payload.academicSemesterId,
            fullPaymentAmount: payload.totalPaymentAmount,
            partialPaymentAmount: payload.totalPaymentAmount * 0.5,
            totalDueAmount: payload.totalPaymentAmount,
            totalPaidAmount: 0,
        };
        yield prismaClient.studentSemesterPayment.create({
            data: dataToInsert,
        });
    }
});
exports.StudentSemesterPaymentService = {
    createSemesterPayment,
};
