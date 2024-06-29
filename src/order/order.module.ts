import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { DonHangEntity } from 'src/database/Entity/index.entity';
import { DatabaseModule } from 'src/database/database.module';
import { unknowProviders } from 'src/middleware/dynamic-providers.providers';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from 'src/database/Repository/DonHang.repository';
import { OrderDetailModule } from 'src/orderdetail/orderdetail.module';
import { ProductModule } from 'src/product/product.module';
import { AuthModule } from 'src/auth/auth.module';
import { RedisModule } from 'src/redis/redis.module';
import { NotificationModule } from 'src/notification/notification.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { LoggingMiddleware } from 'src/middleware/loggingMidleWareOrder.midleware';
import { AccountModule } from 'src/account/account.module';
@Module({
    imports: [
        DatabaseModule,
        OrderDetailModule,
        ProductModule,
        AuthModule,
        RedisModule,
        NotificationModule,
        JwtModule.register({}),
        AccountModule,
    ],
    providers: [unknowProviders('BILL_REPOSITORY', DonHangEntity), OrderService, JwtService],
    controllers: [OrderController],
    exports: [OrderService],
})
export class OrderModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggingMiddleware).forRoutes({ path: 'orders/delete-order/', method: RequestMethod.DELETE });
    }
}
