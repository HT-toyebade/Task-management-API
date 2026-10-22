import { IsBoolean, IsString, Matches, ValidateIf } from 'class-validator';

export class UpdateTaskDto {
  @ValidateIf((_, value) => value !== undefined) // only validate if the field was sent
  @IsString()
  @Matches(/\S/, {
    message: 'Title must not be empty or contain only white spaces',
  })
  title?: string;

  @ValidateIf((_, value) => value !== undefined)
  @IsString()
  description?: string;

  @ValidateIf((_, value) => value !== undefined)
  @IsBoolean()
  completed?: boolean;
}