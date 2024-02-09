import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Param,
  Query,
  Delete,
  NotFoundException
} from '@nestjs/common';
import { CreateUserDto } from './dto/creatr_user.dto';
import { UserService } from './user.service';
import { UpdateUserDto } from './dto/update_user.dto';
import { UserDto } from './dto/user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptors';

@Controller('auth')
@Serialize(UserDto)
export class UserController {
  constructor(private userService: UserService) {}
  @Post('/signup')
  createUser(@Body() body: CreateUserDto) {
    this.userService.create(body.email, body.password);
    return 'User has been inserted';
  }

  //@UseInterceptors(ClassSerializerInterceptor) // for exclude password field in response
  @Get('/:id')
  async findUser(@Param('id') id: string) {
    // console.log("Handler is running");
    const user = await this.userService.findOne(parseInt(id));
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  //@UseInterceptors(ClassSerializerInterceptor)
  @Get()
  async findAllUsers(@Query('email') email: string) {
    // console.log("Handler is running");
    const users = await this.userService.find(email);
    if (!users) {
      throw new NotFoundException('There is no users with this email');
    }
    return users;
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.userService.update(parseInt(id), body);
  }

  @Delete('/:id')
  deleteUser(@Param('id') id: string) {
    return this.userService.remove(parseInt(id));
  }
}
