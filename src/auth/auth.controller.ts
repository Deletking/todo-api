import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { RegisterUserDto } from 'src/DTO/registerUser.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService) {

    }

    @Post('register')
    registration(@Body(ValidationPipe) regDTO: RegisterUserDto) {
        return this.authService.registerUser(regDTO);
    }
}
