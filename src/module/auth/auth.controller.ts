import { Controller, Post, Body, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { LoginDto, RegisterDto, VerifyOtpDto } from './dto';
import { Role } from '../../schemas';

@ApiTags('AUTH')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register for users' })
  async userRegister(@Body() registerDto: RegisterDto) {
    return this.authService.sendOtpForRegister(registerDto, Role.USER);
  }

  @Post('seller/register')
  @ApiOperation({ summary: 'Register for sellers' })
  async sellerRegister(@Body() registerDto: RegisterDto) {
    return this.authService.sendOtpForRegister(registerDto, Role.SELLER);
  }

  @Post('verify-otp')
  @ApiOperation({ summary: 'verify otp must have' })
  @ApiBody({ type: VerifyOtpDto }) 
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto) {
    const { email, otp } = verifyOtpDto;
    return this.authService.verifyOtpAndRegister(email, otp);
  }

  @Post('login')
  @ApiOperation({ summary: 'login users' })
  async userLogin(@Body() loginDto: LoginDto) {
    return this.authService.userLogin(loginDto);
  }

  @Post('admin/login')
  @ApiOperation({ summary: 'login admins' })
  async adminLogin(@Body() loginDto: LoginDto) {
    return this.authService.adminLogin(loginDto);
  }

  @Post('seller/login')
  @ApiOperation({ summary: 'login sellers' })
  async sellerLogin(@Body() loginDto: LoginDto) {
    return this.authService.sellerLogin(loginDto);
  }

  @Post('warehouse-manager/login')
  @ApiOperation({ summary: 'login for bunkers' })
  async warehouseManagerLogin(@Body() loginDto: LoginDto) {
    return this.authService.warehouseManagerLogin(loginDto);
  }
}