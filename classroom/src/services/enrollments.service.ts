/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";

interface GetByCourseAndStudentParams{
    courseId: string;
    studentId: string;
}

@Injectable()
export class EnrollmentsService{
    constructor(private prisma:PrismaService){}

    getByCourseAndStudentId({courseId,studentId}:GetByCourseAndStudentParams){
        return this.prisma.enrollment.findFirst({
            where:{
                courseId,
                studentId,
                canceledAt:null
            },
        });
    }

    listAllEnrollments(){
        return this.prisma.enrollment.findMany({
            where:{
                canceledAt:null,
            },
            orderBy:{
                createdAt:'desc',
            },
        });
    }

    listEnrollmentsByStudent(studentId:string){
        return this.prisma.enrollment.findMany({
            where:{
                studentId,
                canceledAt:null,
            },
            orderBy:{
                createdAt:'desc',
            },
        });
    }
}