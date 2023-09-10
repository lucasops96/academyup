/* eslint-disable prettier/prettier */
import { Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { Student } from "../models/student";
import { UseGuards } from "@nestjs/common";
import { AuthorizationGuard } from "src/http/authorization/authorization.guard";
import { StudentsService } from "src/services/students.service";
import { EnrollmentsService } from "src/services/enrollments.service";
import { AuthUser, CurrentUser } from "src/http/authorization/current-user";


@Resolver(()=> Student)
export class StudentsResolver{
    constructor(
        private studentsService: StudentsService,
        private enrollmentsService: EnrollmentsService
    ){}

    @UseGuards(AuthorizationGuard)
    @Query(()=> Student)
    me(
        @CurrentUser() user:AuthUser
    ){
        return this.studentsService.getStudentByAuthUserId(user.sub);
    }

    @Query(()=>[Student])
    @UseGuards(AuthorizationGuard)
    students(){
        return this.studentsService.listAllStudents()
    }

    @ResolveField()
    enrollments(@Parent() student: Student){
        return this.enrollmentsService.listEnrollmentsByStudent(student.id);
    }
}