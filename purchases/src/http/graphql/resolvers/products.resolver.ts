/* eslint-disable prettier/prettier */
import {  UseGuards } from '@nestjs/common';
import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthorizationGuard } from 'src/http/authorization/authorization.guard';
import { Product } from '../models/product';
import { ProductsService } from 'src/services/products.service';

@Resolver()
export class ProductsResolver {
    constructor(private productsService: ProductsService){}

    @Query(()=> [Product])
    // @UseGuards(AuthorizationGuard)
    products(){
        return this.productsService.listAllProducts();
    }

    @Mutation(()=> Product)
    createProduct(){
        return this.productsService.createProduct();
    }
}
