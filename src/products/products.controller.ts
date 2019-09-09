import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ProductService } from './products.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  addProduct(
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number,
  ) {
    const retrievedId = this.productService.insertProduct(
      prodTitle,
      prodDescription,
      prodPrice,
    );

    return {
      productId: retrievedId,
    };
  }

  @Get()
  getAllProducts() {
    return this.productService.fetchProducts();
  }

  @Get(':id')
  getProduct(@Param('id') prodId: string) {
    return this.productService.fetchSingleProduct(prodId);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') prodId: string,
    @Body('title') prodTitle: string,
    @Body('description') prodDescription: string,
    @Body('price') prodPrice: number,
  ) {
    this.productService.updateProduct(
      prodId,
      prodTitle,
      prodDescription,
      prodPrice,
    );
    return { message: 'Item was successfully updated' };
  }

  @Delete(':id')
  deleteProduct(@Param('id') prodId: string) {
    this.productService.deleteProduct(prodId);
    return {
      message: 'Item deleted successfully',
    };
  }
}
