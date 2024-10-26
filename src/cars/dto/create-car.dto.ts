import { IsString, MinLength } from 'class-validator';

// UN dto es la forma en que la data se va mover dentro de la aplicacion
export class CreateCarDto {
  @IsString()
  readonly brand: string;

  @IsString()
  @MinLength(3)
  readonly model: string;
}
