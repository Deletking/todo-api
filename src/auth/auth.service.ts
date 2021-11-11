import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegisterUserDto } from 'src/DTO/registerUser.dto';
import { UserEntity } from 'src/Entity/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';


@Injectable()
export class AuthService {

    constructor(@InjectRepository(UserEntity) private repo: Repository<UserEntity>) {}

    async registerUser(registerUserDTO: RegisterUserDto) {
        const { username, password } = registerUserDTO;
        const hashed = await bcrypt.hash(password, 12);
        const salt = await bcrypt.getSalt(hashed);
        

        const user = new UserEntity();
        user.username = username;
        user.password = password;
        user.salt = salt;

        this.repo.create(user);
        
        try {
            return await this.repo.save(user);
        } catch (err) {
            throw new InternalServerErrorException('Something went wrong, user was not created.')
        }
    }
}