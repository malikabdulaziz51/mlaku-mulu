import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsObject,
} from 'class-validator';

export class CreateTripDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  startDate: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  endDate: Date;

  @ApiProperty({
    example: {
      name: 'Bali Indonesia',
      coordinates: {
        latitude: -8.409518,
        longitude: 115.188919,
      },
      type: 'beach',
    },
  })
  @IsNotEmpty()
  @IsObject()
  destination: string;

  @ApiProperty()
  @IsNotEmpty()
  description: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  isCompleted: boolean;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  touristId: number;
}
