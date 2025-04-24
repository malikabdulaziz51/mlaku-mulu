import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateUserDto } from 'src/application/dtos/user/create-user.dto';
import { UpdateUserDto } from 'src/application/dtos/user/update-user.dto';
import { UserRole } from 'src/domain/enums/user-role.enum';
import { Roles } from 'src/infrastructure/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/infrastructure/auth/guards/roles.guard';
import { CreateUserUseCase } from 'src/use-cases/user/create-user.usecase';
import { DeleteUserUseCase } from 'src/use-cases/user/delete.usecase';
import { findAllUsersUseCase } from 'src/use-cases/user/find-all.usecase';
import { FindUserByIdUseCase } from 'src/use-cases/user/find-user-by-id.usecase';
import { UpdateUserUseCase } from 'src/use-cases/user/update-user.usecase';

@ApiTags('users')
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly findAllUsersUseCase: findAllUsersUseCase,
    private readonly findUserByIdUseCase: FindUserByIdUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create new user' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @Roles(UserRole.EMPLOYEE)
  create(@Body() createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Returns all users' })
  @Roles(UserRole.EMPLOYEE)
  findAll() {
    return this.findAllUsersUseCase.execute();
  }

  @ApiOperation({ summary: 'Get user by ID' })
  @ApiResponse({ status: 200, description: 'Returns user by ID' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Roles(UserRole.EMPLOYEE)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.findUserByIdUseCase.execute(+id);
  }

  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, description: 'User updated successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Roles(UserRole.EMPLOYEE)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.updateUserUseCase.execute(+id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully' })
  @ApiResponse({ status: 404, description: 'User not found' })
  @Roles(UserRole.EMPLOYEE)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteUserUseCase.execute(+id);
  }
}
