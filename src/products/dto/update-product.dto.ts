import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, MaxLength, IsOptional, IsString, Length, IsAlphanumeric, MinLength } from 'class-validator';

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @IsNotEmpty()
    @IsOptional()
    @MaxLength(50)
    @ApiPropertyOptional({example:'Iphone 14'})
    name?:string;

    @IsOptional()
    @IsNotEmpty()
    @ApiPropertyOptional({type:'string',format:'binary',description:'Image file'})
    images?:any;

    @IsOptional()
    @IsNotEmpty()
    @ApiPropertyOptional({example:75900})
    price?:number;

    @IsOptional()
    @IsNotEmpty()
    @ApiPropertyOptional({example:79900})
    selling_price?:number;

    // @ApiProperty({example:'MDU893N6'})
    // @IsString()
    // @Length(8,8)
    // @IsNotEmpty()
    // @IsAlphanumeric()
    // sku:string;

    @ApiPropertyOptional({example:'Electronics'})
    @MinLength(2)
    @IsOptional()
    @IsNotEmpty()
    @MaxLength(40)
    category?:string;

    @ApiPropertyOptional({example: '2953051204516'})
    @Length(13,13)
    @IsOptional()
    @IsNotEmpty()
    barcode?:string;
    
}
