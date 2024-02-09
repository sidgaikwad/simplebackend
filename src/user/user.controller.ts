import { Body, Controller, Get, Param, ParseIntPipe, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createuser.dto';
import { LoginUserDto } from './dtos/loginuser.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  @UsePipes(ValidationPipe)
  register(@Body() createuserdto: CreateUserDto) {
    return this.userService.Register(createuserdto);
  }

  @Get(':id')
  getUserByID(@Param('id', ParseIntPipe) id:number){
    return this.userService.findUserById(id)
  }

  @Post('login')
  async login(@Body() loginDto: LoginUserDto){
    return this.userService.loginUser(loginDto)
  }
}
