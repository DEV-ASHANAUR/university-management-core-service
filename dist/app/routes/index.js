"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const academicDepartment_routes_1 = require("../modules/academicDepartment/academicDepartment.routes");
const academicFaculty_routes_1 = require("../modules/academicFaculty/academicFaculty.routes");
const academicSemester_routes_1 = require("../modules/academicSemester/academicSemester.routes");
const building_route_1 = require("../modules/building/building.route");
const course_route_1 = require("../modules/course/course.route");
const faculty_routes_1 = require("../modules/faculty/faculty.routes");
const room_route_1 = require("../modules/room/room.route");
const semesterRegistration_routes_1 = require("../modules/semesterRegistration/semesterRegistration.routes");
const student_routes_1 = require("../modules/student/student.routes");
const offeredCourse_routes_1 = require("../modules/offeredCourse/offeredCourse.routes");
const offeredCourseSection_routes_1 = require("../modules/offeredCourseSection/offeredCourseSection.routes");
const offeredCourseClassSchedule_routes_1 = require("../modules/offeredCourseClassSchedule/offeredCourseClassSchedule.routes");
const studentEnrolledCourse_route_1 = require("../modules/studentEnrolledCourse/studentEnrolledCourse.route");
const studentEnrolledCourseMark_route_1 = require("../modules/studentEnrolledCourseMark/studentEnrolledCourseMark.route");
const router = express_1.default.Router();
const moduleRoutes = [
    // ... routes
    {
        path: '/academic-semesters',
        route: academicSemester_routes_1.AcademicSemesterRoutes,
    },
    {
        path: '/academic-faculty',
        route: academicFaculty_routes_1.AcademicFacultyRoutes,
    },
    {
        path: '/academic-department',
        route: academicDepartment_routes_1.AcademicDepartmentRoutes,
    },
    {
        path: '/students',
        route: student_routes_1.StudentRoutes,
    },
    {
        path: '/faculties',
        route: faculty_routes_1.FacultyRoutes,
    },
    {
        path: '/buildings',
        route: building_route_1.BuildingRoutes,
    },
    {
        path: '/rooms',
        route: room_route_1.RoomRoutes,
    },
    {
        path: '/courses',
        route: course_route_1.CourseRoutes,
    },
    {
        path: '/semester-registration',
        route: semesterRegistration_routes_1.SemesterRegistrationRoutes,
    },
    {
        path: '/offered-courses',
        route: offeredCourse_routes_1.offeredCourseRoutes,
    },
    {
        path: '/offered-course-sections',
        route: offeredCourseSection_routes_1.OfferedCourseSectionRoutes,
    },
    {
        path: '/offered-course-class-schedules',
        route: offeredCourseClassSchedule_routes_1.OfferedCourseClassScheduleRoutes
    },
    {
        path: '/student-enrolled-courses',
        route: studentEnrolledCourse_route_1.studentEnrolledCourseRoutes
    },
    {
        path: '/student-enrolled-course-marks',
        route: studentEnrolledCourseMark_route_1.studentEnrolledCourseMarkRoutes
    }
];
moduleRoutes.forEach(route => router.use(route.path, route.route));
exports.default = router;
