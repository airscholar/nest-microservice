import { ProductService } from './product.service';
import { Product } from './product.entity';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    getAllProducts(): Promise<{
        result: Product[];
    }>;
    createProduct(product: Product): Promise<{
        result: Product;
    }>;
    getProductById(prodId: number): Promise<{
        result: Product;
    }>;
    updateProductById(prodId: number, product: Product): Promise<{
        result: Product;
    }>;
    deleteProductById(prodId: number): Promise<{
        result: string;
    }>;
}
