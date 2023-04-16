import { IsCurrency, IsNotEmpty, IsOptional, MaxLength, MinLength, IsString, Length, IsAlphanumeric } from "class-validator";
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";





export class CreateProductDto {

    @IsNotEmpty()
    @MaxLength(50)
    @ApiProperty({example:'Iphone 14'})
    name:string;

    @IsOptional()
    @ApiPropertyOptional()
    images?:string[];

    @IsNotEmpty()
    @ApiProperty({example:75900})
    price:number;

    @IsNotEmpty()
    @ApiProperty({example:79900})
    selling_price:number;

    // @ApiProperty({example:'MDU893N6'})
    // @IsString()
    // @IsUnique()
    // @Length(8,8)
    // @IsNotEmpty()
    // @IsAlphanumeric()
    // sku:string;

    @ApiProperty({example:'Electronics'})
    @MinLength(2)
    @IsNotEmpty()
    @MaxLength(40)
    category:string;

    @ApiProperty({example: '2953051204516'})
    @Length(13,13)
    @IsNotEmpty()
    barcode:string;

}
