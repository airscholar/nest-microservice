import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductService } from './product.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { Product } from './product.entity';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [
            'amqps://peflsyyy:EYU_fMXRFP_lYw8aeMh3hpRHLyjBf71b@jaguar.rmq.cloudamqp.com/peflsyyy',
          ],
          queue: 'main_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
