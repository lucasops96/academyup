/* eslint-disable prettier/prettier */
import {  UseGuards } from '@nestjs/common';
import { Args, Mutation, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import {  AuthorizationGuard } from 'src/http/authorization/authorization.guard';

import { PurchasesService } from 'src/services/purchases.service';
import { Purchase } from '../models/purchase';
import { ProductsService } from 'src/services/products.service';
import { CreatePurchaseInput } from '../inputs/create-purchase-input';
import { AuthUser, CurrentUser } from 'src/http/authorization/current-user';
import { CustomersService } from 'src/services/customers.service';

@Resolver(()=> Purchase)
export class PurchasesResolver {
    constructor(
        private purchasesService: PurchasesService,
        private productsService: ProductsService,
        private customersService: CustomersService,
    ){}

    @Query(()=> [Purchase])
    @UseGuards(AuthorizationGuard)
    purchases(){
        return this.purchasesService.listAllPurchases();
    }

    @ResolveField()
    product(@Parent() purchase:Purchase){
        return this.productsService.getProductById(purchase.productId)
    }

    @UseGuards(AuthorizationGuard)
    @Mutation(()=> Purchase)
    async createPurchase(@Args('data') data: CreatePurchaseInput, @CurrentUser() user: AuthUser){
        console.log(user.sub)
        return null;
        // return this.purchasesService.createPurchase({
        //     productId: data.productId,
        //     customerId:
        // })
    }
}
