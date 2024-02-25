"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.semesterRegistrationRelationalFieldMapper = exports.semesterRegistrationRelationalFields = exports.semesterRegistrationSearchableFields = exports.semesterRegistrationFilterableFields = void 0;
exports.semesterRegistrationFilterableFields = [
    'searchTerm',
    'id',
    'academicsemesterId',
];
exports.semesterRegistrationSearchableFields = [];
exports.semesterRegistrationRelationalFields = [
    'academicSemesterId',
];
exports.semesterRegistrationRelationalFieldMapper = {
    academicSemesterId: 'academicSemester',
};
