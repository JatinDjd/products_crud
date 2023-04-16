import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm/repository/Repository'
import { Like } from 'typeorm';
import { PaginationDto } from './dto/pagination.dto';
import { SearchQueryDto } from './dto/searchQuery.dto';
import { paginate, Pagination  } from 'nestjs-typeorm-paginate';
import * as AWS from 'aws-sdk'

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly products: Repository<Product>,
    
  ) { 
    // this.s3 = new S3({
    //   accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    //   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    //   region: process.env.AWS_REGION,
    // });
  }







  async create(createProductDto: CreateProductDto) {

    const sku = Math.random().toString(36).substring(2, 10).toUpperCase();
    const payload = { ...createProductDto, sku }


    const saveToDb = await this.products.save(payload)
    return saveToDb;

  }


  async findOne(sku: string) {
    try {
      const findSku = await this.products.findOneOrFail({ where: { sku } });
      return findSku;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    await this.products.update(id, updateProductDto);
    const item = await this.products.findOne({ where: { id } });
    return item;
  }




  async getList(paginationDto: PaginationDto) {
    const { limit, page } = paginationDto;

    // const response = await this.products.find({
    //   take: limit,
    //   skip: offset,
    // });

    // return response;
    const pagination = await paginate<Product>(
      this.products,
      { limit, page },
      {
        order: { name: 'ASC' },
      },
    );
  
    return pagination;
  }


  async search(searchQueryDto: SearchQueryDto) {
    try {
      const { name, category, barcode } = searchQueryDto;

      const products = await this.products.find({
        where: [
          { name: Like(`%${name}%`) },
          { category: Like(`%${category}%`) },
          { barcode: Like(`%${barcode}%`) },
        ],
      });

      return products;
    }

    catch (error) {
      throw error;
    }
  }

  async uploadImagesToS3(id: string) {
    try{// Load product from the database
    const product = await this.products.findOne({where:{id}});
    if (!product) {
      throw new Error(`Product with id ${id} not found`);
    }

    // Initialize AWS S3 client with your credentials
    const s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    });

    // Upload each image in the `images` column to S3
    const promises = product.images.map((imageUrl) => {
      const imageKey = `product-images/${id}/${imageUrl}`;
      const params = {
        Bucket: 'orufy',
        Key: imageKey,
        Body: imageUrl,
        ContentType: 'image/jpeg', // Change this to the correct content type of your images
        ACL: 'public-read',
      };
      return s3.upload(params).promise();
    });

    // Wait for all uploads to finish
    await Promise.all(promises);}
    catch(err){
      throw err;
    }
  }
}



