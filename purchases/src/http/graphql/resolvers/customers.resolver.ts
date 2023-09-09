/* eslint-disable prettier/prettier */
import {  UseGuards } from '@nestjs/common';
import {  Query, Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/authorization/authorization.guard';

import { Customer } from '../models/customer';
import { CustomersService } from 'src/services/customers.service';
import { AuthUser, CurrentUser } from 'src/http/authorization/current-user';
import { PurchasesService } from 'src/services/purchases.service';

@Resolver(()=> Customer)
export class CustomersResolver {
    constructor(
        private customersService: CustomersService,
        private purchasesService: PurchasesService,    
    ){}

    @UseGuards(AuthorizationGuard)
    @Query(()=> Customer)
    me(@CurrentUser() user:AuthUser){
        return this.customersService.getCustomerByAuthUserId(user.sub)
    }

    @ResolveField()
    purchases(@Parent() customer:Customer){
        return this.purchasesService.listAllFromCustomer(customer.id)
    }
}
