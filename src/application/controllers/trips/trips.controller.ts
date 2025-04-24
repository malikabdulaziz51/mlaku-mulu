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
import { CreateTripDto } from 'src/application/dtos/trip/create-trip.dto';
import { UpdateTripDto } from 'src/application/dtos/trip/update-trip.dto';
import { UserRole } from 'src/domain/enums/user-role.enum';
import { Roles } from 'src/infrastructure/auth/decorators/roles.decorator';
import { JwtAuthGuard } from 'src/infrastructure/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/infrastructure/auth/guards/roles.guard';
import { CreateTripUseCase } from 'src/use-cases/trip/create-trip.usecase';
import { DeleteTripUseCase } from 'src/use-cases/trip/delete.usecase';
import { FindAllUseCase } from 'src/use-cases/trip/find-all.usecase';
import { FindByIdUseCase } from 'src/use-cases/trip/find-by-id.usecase';
import { findByTouristIdUseCase } from 'src/use-cases/trip/find-by-tourist-id.usecase';
import { UpdateTripUseCase } from 'src/use-cases/trip/update-trip.usecase';

@ApiTags('trips')
@Controller('trips')
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth()
export class TripsController {
  constructor(
    private readonly createTripUseCase: CreateTripUseCase,
    private readonly findAllTripsUseCase: FindAllUseCase,
    private readonly findTripByIdUseCase: FindByIdUseCase,
    private readonly findTripsByTouristIdUseCase: findByTouristIdUseCase,
    private readonly updateTripUseCase: UpdateTripUseCase,
    private readonly deleteTripUseCase: DeleteTripUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create new trip' })
  @ApiResponse({ status: 201, description: 'Trip created successfully' })
  @Roles(UserRole.EMPLOYEE)
  create(@Body() createTripDto: CreateTripDto) {
    return this.createTripUseCase.execute(createTripDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all trips' })
  @ApiResponse({ status: 200, description: 'Returns all trips' })
  @Roles(UserRole.EMPLOYEE)
  @Get()
  findAll() {
    return this.findAllTripsUseCase.execute();
  }

  @ApiOperation({ summary: 'Get trip by ID' })
  @ApiResponse({ status: 200, description: 'Returns trip by ID' })
  @ApiResponse({ status: 404, description: 'Trip not found' })
  @Get(':id')
  async findOne(@Param('id') id: string, @Request() req: any) {
    const trip = await this.findTripByIdUseCase.execute(+id);

    // Check if user is employee or the tourist themselves
    if (
      req.user.role === UserRole.TOURIST &&
      req.user.touristId !== trip.getTourist().getId()
    ) {
      throw new ForbiddenException('You can only view your own trips');
    }

    return trip;
  }

  @ApiOperation({ summary: 'Get trips by tourist ID' })
  @ApiResponse({ status: 200, description: 'Returns trips by tourist ID' })
  @Get('tourist/:touristId')
  async findByTouristId(
    @Param('touristId') touristId: string,
    @Request() req: any,
  ) {
    // Check if user is employee or the tourist themselves
    if (
      req.user.role === UserRole.TOURIST &&
      req.user.touristId !== +touristId
    ) {
      throw new ForbiddenException('You can only view your own trips');
    }

    return this.findTripsByTouristIdUseCase.execute(+touristId);
  }

  @ApiOperation({ summary: 'Update trip' })
  @ApiResponse({ status: 200, description: 'Trip updated successfully' })
  @ApiResponse({ status: 404, description: 'Trip not found' })
  @Roles(UserRole.EMPLOYEE)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTripDto: UpdateTripDto) {
    return this.updateTripUseCase.execute(+id, updateTripDto);
  }

  @ApiOperation({ summary: 'Delete trip' })
  @ApiResponse({ status: 200, description: 'Trip deleted successfully' })
  @ApiResponse({ status: 404, description: 'Trip not found' })
  @Roles(UserRole.EMPLOYEE)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.deleteTripUseCase.execute(+id);
  }
}
