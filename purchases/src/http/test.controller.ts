/* eslint-disable prettier/prettier */
import { Controller,Get, UseGuards } from '@nestjs/common';
import { AuthorizationGuard } from 'src/http/authorization/authorization.guard';

@Controller('test')
export class TestController {
    @Get()
    @UseGuards(AuthorizationGuard)
    hello(){
        return 'Ok';
    }
}
