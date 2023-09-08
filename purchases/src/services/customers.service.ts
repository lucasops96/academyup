/* eslint-disable prettier/prettier */
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/database/prisma/prisma.service";

interface CreateCustomerParams{
    authUserId:string;
}

@Injectable()
export class CustomersService{
    constructor(private prisma: PrismaService){}

    async getCustomerByAuthUserId(authUserId:string){
        const customer =  await this.prisma.customer.findUnique({
            where:{
                authUserId,
            },
        });

        if(!customer){
            return null
        }

        return customer

    }

    async createCustomer({authUserId}:CreateCustomerParams){

        return this.prisma.customer.create({
            data:{
                authUserId,
            },
        });
    }

    
}