import { Repository } from 'typeorm';
import { Product } from './product.entity';
export declare class ProductService {
    private readonly productRepository;
    constructor(productRepository: Repository<Product>);
    getAllProducts(): Promise<Product[]>;
    createProduct(product: Product): Promise<Product>;
    getProductById(prodId: number): Promise<Product>;
    updateProductById(prodId: number, product: Product): Promise<Product>;
    deleteProductById(prodId: number): Promise<string>;
    private fetchProductById;
}
