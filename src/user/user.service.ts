import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/TypeOrm/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/createuser.dto';
import * as bcrypt from 'bcrypt'
@Injectable()
export class UserService {

    constructor(
        @InjectRepository(Users) private readonly userRepository: Repository<Users>
    ) {}

    async Register(createUserDto: CreateUserDto){
        const {password, ...rest} = createUserDto

        //? hashing the password

        const hashedPassword = await bcrypt.hash(password, 10);

        //* create new user 

        const newUser = this.userRepository.create({
            ...rest,
            Password: hashedPassword,
        });

        return this.userRepository.save(newUser);
    }

    //* find user by id

    async findUserById(id: number){
        const options: FindOneOptions<Users> = {where:{id} };
        return this.userRepository.findOne(options)
    }
}
