/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";


@Injectable()
export class StudentsService{
    constructor(private prisma:PrismaService){}

    listAllStudents(){
        return this.prisma.student.findMany();
    }

    async getStudentByAuthUserId(authUserId:string){
        const student = await this.prisma.student.findUnique({
            where:{
                authUserId,
            }
        });

        if(!student){
            return null
        }

        return student
    }

    getStudentById(id:string){
        return this.prisma.student.findUnique({
            where:{
                id,
            },
        });
    }
}