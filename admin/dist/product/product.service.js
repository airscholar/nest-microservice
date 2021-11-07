"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const product_entity_1 = require("./product.entity");
let ProductService = class ProductService {
    constructor(productRepository) {
        this.productRepository = productRepository;
    }
    async getAllProducts() {
        return await this.productRepository.find({});
    }
    async createProduct(product) {
        const created_product = await this.productRepository.save(product);
        if (!created_product) {
            throw new common_1.InternalServerErrorException('Unable to create a product');
        }
        return created_product;
    }
    async getProductById(prodId) {
        return await this.fetchProductById(prodId);
    }
    async updateProductById(prodId, product) {
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
            throw new common_1.InternalServerErrorException('Unable to update product');
        }
        return existingProduct;
    }
    async deleteProductById(prodId) {
        const product = await this.fetchProductById(prodId);
        await this.productRepository.delete(product);
        return `Product with ID: ${product.id} deleted successfully!`;
    }
    async fetchProductById(productId) {
        const product = await this.productRepository.findOne({ id: productId });
        if (!product) {
            throw new common_1.NotFoundException('Product Not Found');
        }
        return product;
    }
};
ProductService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(product_entity_1.Product)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProductService);
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map