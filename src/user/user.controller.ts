import { Controller, Get, Param, ParseIntPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createuser.dto';

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
}
