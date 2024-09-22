
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsInt, Min, Max, IsString, IsOptional } from "class-validator";

export class CreateReviewDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '66f0453554c8ce590f21e705' })
    productId: string;
  
    @IsInt()
    @Min(1)
    @Max(5)
    @ApiProperty({ example: 4, description: '1 dan 10 gacha baxolang' })
    rating: number;
  
    @IsString()
    @IsOptional()
    @ApiProperty({ example: 'comment' })
    comment?: string;
  
    @IsOptional()
    @ApiProperty({ type: [String], example: ['photo1.jpg', 'photo2.jpg'] })
    photos?: string[];
}
