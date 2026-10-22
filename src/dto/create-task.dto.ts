import { IsString, Matches  } from 'class-validator';

 export class createTaskDto {
    @IsString()
    @Matches(/\S/, { message: 'Title must  not be empty or contain white spaces',

    })
    title!: string;


    @IsString()
    description!: string;
   }