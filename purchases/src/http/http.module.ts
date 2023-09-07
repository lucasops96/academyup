/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { DatabaseModule } from 'src/database/database.module';
import { GraphQLModule } from '@nestjs/graphql';


import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
import { ProductsResolver } from './graphql/resolvers/products.resolver';
import { ProductsService } from 'src/services/products.service';
import { PurchasesResolver } from './graphql/resolvers/purchases.resolver';
import { PurchasesService } from 'src/services/purchases.service';
import { CustomersService } from 'src/services/customers.service';

@Module({
    imports: [
        ConfigModule.forRoot(), 
        DatabaseModule,
        GraphQLModule.forRoot<ApolloDriverConfig>({
            driver: ApolloDriver,
            autoSchemaFile: join(process.cwd(),'src/schema.gql'),
        }),
    ],
    providers: [
        // Resolvers
        ProductsResolver,
        PurchasesResolver,
        // Services
        ProductsService,
        PurchasesService,
        CustomersService,
    ]
})
export class HttpModule {}
