import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.model';

@Injectable()
export class ProductService {
  products: Product[] = [];

  insertProduct(title: string, desc: string, price: number) {
    const id = Math.random().toString();
    const newProduct = new Product(id, title, desc, price);

    this.products.push(newProduct);
    return id;
  }

  fetchProducts() {
    return [...this.products];
  }

  fetchSingleProduct(id: string) {
    const product = this.findProduct(id)[0];

    return {
      ...product,
    };
  }

  updateProduct(id: string, title: string, desc: string, price: number) {
    const [product, index] = this.findProduct(id);
    const updatedProducts = { ...product };

    if (title) {
      updatedProducts.title = title;
    }

    if (desc) {
      updatedProducts.description = desc;
    }

    if (price) {
      updatedProducts.price = price;
    }
    this.products[index] = updatedProducts;
  }

  deleteProduct(id: string) {
    const [_, index] = this.findProduct(id);

    this.products.splice(index, 1);
  }

  private findProduct(id: string): [Product, number] {
    const productIndex = this.products.findIndex(prod => prod.id === id);
    const product = this.products[productIndex];

    if (!product) {
      throw new NotFoundException('Could not find product.');
    }

    return [product, productIndex];
  }
}
