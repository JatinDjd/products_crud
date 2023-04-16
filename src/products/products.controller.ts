import { Controller, Get, Post, Body, Patch, Param, Delete, Query, BadRequestException, UploadedFile, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PaginationDto } from './dto/pagination.dto';
import { SearchQueryDto } from './dto/searchQuery.dto';
import { ApiBody, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { File } from 'multer';


@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('add')
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @ApiParam({ name: 'id', required: false })
  @Patch(':id')  // Please run this endpoint in Postman as field for id has not been provided in swagger
  update(@Param('id') id:any, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id.toString(), updateProductDto);
  }


  @Get(':sku')
  findOne(@Param('sku') sku: string) {
    return this.productsService.findOne(sku);
  }

  @Get()
  async findPaginated(@Query() paginationDto: PaginationDto) {
    const res = await this.productsService.getList(paginationDto);
    return res;
  }

  @ApiBody({ type: SearchQueryDto })
  @Post('search')
  async search(@Body() searchQueryDto: SearchQueryDto) {
    const res = await this.productsService.search(searchQueryDto);
    return res;
  }
 

  @Post(':id/upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@Param('id') id: string, @UploadedFile() file) {
    return await this.productsService.uploadImagesToS3(id);
  }


}
