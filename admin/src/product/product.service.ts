import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async getAllProducts(): Promise<Product[]> {
    return await this.productRepository.find({});
  }

  async createProduct(product: Product): Promise<Product> {
    const created_product = await this.productRepository.save(product);

    if (!created_product) {
      throw new InternalServerErrorException('Unable to create a product');
    }

    return created_product;
  }

  async getProductById(prodId: number): Promise<Product> {
    return await this.fetchProductById(prodId);
  }

  async updateProductById(prodId: number, product: Product): Promise<Product> {
    const existingProduct = await this.fetchProductById(prodId);

    if (product.title) {
      existingProduct.title = product.title;
    }
    if (product.image) {
      existingProduct.image = product.image;
    }
    if (product.likes) {
      existingProduct.likes = product.likes;
    }

    const res = await this.productRepository.update(prodId, existingProduct);
    if (res.affected !== 1) {
      throw new InternalServerErrorException('Unable to update product');
    }

    return existingProduct;
  }

  async deleteProductById(prodId: number): Promise<string> {
    const product = await this.fetchProductById(prodId);

    await this.productRepository.delete(product);

    return `Product with ID: ${product.id} deleted successfully!`;
  }

  private async fetchProductById(productId: number): Promise<Product> {
    const product = await this.productRepository.findOne({ id: productId });

    if (!product) {
      throw new NotFoundException('Product Not Found');
    }

    return product;
  }
}
