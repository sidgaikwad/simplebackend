import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/TypeOrm/user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { CreateUserDto } from './dtos/createuser.dto';
import * as bcrypt from 'bcrypt'
import * as jwt from 'jsonwebtoken'
import { LoginUserDto } from './dtos/loginuser.dto';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class UserService {

    constructor(
        @InjectRepository(Users) private readonly userRepository: Repository<Users>,
        private configService: ConfigService,
    ) {}

    async Register(createUserDto: CreateUserDto){
        const {password, ...rest} = createUserDto

        //? hashing the password

        const hashedPassword = await bcrypt.hash(password, 10);

        //* create new user 

        const newUser = this.userRepository.create({
            ...rest,
            password: hashedPassword,
        });

        return this.userRepository.save(newUser);
    }

    //* find user by id

    async findUserById(id: number){
        const options: FindOneOptions<Users> = {where:{id} };
        return this.userRepository.findOne(options)
    }

    //* login user

    async loginUser(loginUserdto: LoginUserDto){
        const{email, password} = loginUserdto;

        const user = await this.userRepository.findOne({where: {email}})

        if(!user){
            throw new UnauthorizedException('Invalid credentials')
        }
    //* Generate Jwt Token

        const token = this.generateJwtToken(email, user.id, password, `${user.firstname} ${user.lastname}`,);

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!isPasswordValid){
            throw new UnauthorizedException('Invalid credentials: password not vaild')
        }

        return { token }
    }
    private generateJwtToken(email : string,  userId: number, password: string, name: string): string {
        const payload ={email, name, password, userId};
        const secret = this.configService.get('SECRET');
        const options = {expiresIn: '1h'};

        return jwt.sign(payload,secret, options )
    }
}
