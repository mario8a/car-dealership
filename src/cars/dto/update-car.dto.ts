import { IsOptional, IsString, IsUUID } from 'class-validator';

// UN dto es la forma en que la data se va mover dentro de la aplicacion
export class UpdateCarDto {
  @IsString()
  @IsUUID()
  @IsOptional()
  readonly id?: string;

  @IsString()
  @IsOptional()
  readonly brand?: string;

  @IsString()
  @IsOptional()
  readonly model?: string;
}
