import { IsOptional } from "class-validator";

export class SearchQueryDto {
    @IsOptional()
    name?: string;
  
    @IsOptional()
    category?: string;
  
    @IsOptional()
    barcode?: string;
  }