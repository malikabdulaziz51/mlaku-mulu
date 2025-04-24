import {
  Controller,
  UseGuards,
  Post,
  Body,
  Get,
  Param,
  ForbiddenException,
  Patch,
  Delete,
  Request,
} from '@nestjs/common';
import {
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { CreateTouristDto } from 'src/application/dtos/tourist/create-tourist.dto';
import { UpdateTouristDto } from 'src/application/dtos/tourist/update-tourist.dto';
import { UserRole } from 'src/domain/enums/user-role.enum';
import { Roles } from 'src/infrastructure/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/infrastructure/auth/guards/roles.guard';
import { CreateTouristUseCase } from 'src/use-cases/tourist/create-tourist.usecase';
import { DeleteTouristUseCase } from 'src/use-cases/tourist/delete.usecase';
import { FindAllUseCase } from 'src/use-cases/tourist/find-all.usecase';
import { FindByIdUseCase } from 'src/use-cases/tourist/find-by-id.usecase';
import { UpdateTouristUseCase } from 'src/use-cases/tourist/update-tourist.usecase';

@ApiTags('tourists')
@Controller('tourists')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class TouristsController {
  constructor(
    private readonly createTouristUseCase: CreateTouristUseCase,
    private readonly findAllTouristsUseCase: FindAllUseCase,
    private readonly findTouristByIdUseCase: FindByIdUseCase,
    private readonly updateTouristUseCase: UpdateTouristUseCase,
    private readonly deleteTouristUseCase: DeleteTouristUseCase,
  ) {}

  @Post()
  @Roles(UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Create new tourist' })
  @ApiResponse({ status: 201, description: 'Tourist created successfully' })
  create(@Body() createTouristDto: CreateTouristDto) {
    return this.createTouristUseCase.execute(createTouristDto);
  }

  @Get()
  @Roles(UserRole.EMPLOYEE)
  @ApiOperation({ summary: 'Get all tourists' })
  @ApiResponse({ status: 200, description: 'Returns all tourists' })
  @Roles(UserRole.EMPLOYEE)
  @Get()
  findAll() {
    return this.findAllTouristsUseCase.execute();
  }

  @ApiOperation({ summary: 'Get tourist by ID' })
  @ApiResponse({ status: 200, description: 'Returns tourist by ID' })
  @ApiResponse({ status: 404, description: 'Tourist not found' })
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req: any) {
    // Check if user is employee or the tourist themselves
    if (req.user.role === UserRole.TOURIST && req.user.touristId !== +id) {
      throw new ForbiddenException('You can only view your own profile');
    }

    return this.findTouristByIdUseCase.execute(+id);
  }

  @ApiOperation({ summary: 'Update tourist' })
  @ApiResponse({ status: 200, description: 'Tourist updated successfully' })
  @ApiResponse({ status: 404, description: 'Tourist not found' })
  @Roles(UserRole.EMPLOYEE)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTouristDto: UpdateTouristDto) {
    return this.updateTouristUseCase.execute(+id, updateTouristDto);
  }

  @ApiOperation({ summary: 'Delete tourist' })
  @ApiResponse({ status: 200, description: 'Tourist deleted successfully' })
  @ApiResponse({ status: 404, description: 'Tourist not found' })
  @Roles(UserRole.EMPLOYEE)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteTouristUseCase.execute(+id);
  }
}
