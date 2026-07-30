import {
  Controller,
  Delete,
  Get,
  Param,
  Put,
  Body,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';

import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guard/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorators';
import { ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}

  // GET ALL USER
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN', 'ADMIN')
  @Get()
  findAll() {
    return this.userService.findAll();
  }

// GET ALL ADMIN
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN')
  @Get('admin/all')
  findAllAdmin() {
    return this.userService.findAllAdmin();
  }

  // GET USER BY ID
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN')
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }

  // UPDATE USER
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN')
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: any,
  ) {
    return this.userService.update(id, dto);
  }

  // DELETE USER
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('SUPERADMIN')
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.userService.remove(id);
  }
}
