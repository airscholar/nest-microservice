import { ClientProxy } from '@nestjs/microservices';
import { ProductService } from './product.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Product } from './product.entity';

@Controller('products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    @Inject('PRODUCT_SERVICE') private readonly client: ClientProxy,
  ) {}

  @Get()
  async getAllProducts() {
    this.client.emit('hello', 'Hello there!');
    const products = await this.productService.getAllProducts();
    return { result: products };
  }

  @Post()
  async createProduct(@Body() product: Product) {
    const result = await this.productService.createProduct(product);

    this.client.emit('product_created', product);

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

    this.client.emit('product_updated', { prodId, product: result });

    return { result };
  }

  @Get(':prodId/like')
  async likeProduct(@Param('prodId') prodId: number) {
    const product = await this.productService.getProductById(prodId);
    product.likes++;
    const updatedProduct = await this.productService.updateProductById(
      prodId,
      product,
    );

    console.log('Admin like', updatedProduct);
    return { result: updatedProduct };
  }

  @Delete(':prodId')
  async deleteProductById(@Param('prodId') prodId: number) {
    const result = await this.productService.deleteProductById(prodId);

    this.client.emit('product_deleted', prodId);

    return { result };
  }
}
