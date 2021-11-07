import { ProductService } from './product.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Product } from './product.entity';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts() {
    const products = await this.productService.getAllProducts();
    return { result: products };
  }

  @Post()
  async createProduct(@Body() product: Product) {
    const result = await this.productService.createProduct(product);
    return { result };
  }

  @Get(':prodId')
  async getProductById(@Param('prodId') prodId: number) {
    const result = await this.productService.getProductById(prodId);

    return { result };
  }

  @Patch(':prodId')
  async updateProductById(
    @Param('prodId') prodId: number,
    @Body() product: Product,
  ) {
    const result = await this.productService.updateProductById(prodId, product);

    return { result };
  }

  @Delete(':prodId')
  async deleteProductById(@Param('prodId') prodId: number) {
    const result = await this.productService.deleteProductById(prodId);
    return { result };
  }
}
