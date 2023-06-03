"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var config_1 = require("@nestjs/config");
var app_controller_1 = require("./app.controller");
var app_service_1 = require("./app.service");
var sneakers_module_1 = require("./sneakers/sneakers.module");
var users_module_1 = require("./users/users.module");
var env_helper_1 = require("./common/helper/env.helper");
var typeorm_1 = require("@nestjs/typeorm");
var typeorm_service_1 = require("./common/shared/typeorm/typeorm.service");
var images_module_1 = require("./images/images.module");
var event_emitter_1 = require("@nestjs/event-emitter");
var platform_express_1 = require("@nestjs/platform-express");
var comments_module_1 = require("./comments/comments.module");
var carts_module_1 = require("./carts/carts.module");
var invoices_module_1 = require("./invoices/invoices.module");
var cart_items_module_1 = require("./cart-items/cart-items.module");
var auth_module_1 = require("./auth/auth.module");
var jwt_strategy_1 = require("./auth/strategies/jwt.strategy");
var brands_module_1 = require("./brands/brands.module");
var product_types_module_1 = require("./product-types/product-types.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                config_1.ConfigModule.forRoot(env_helper_1.configEnvPath),
                typeorm_1.TypeOrmModule.forRootAsync({ useClass: typeorm_service_1.TypeOrmConfigSerivce }),
                event_emitter_1.EventEmitterModule.forRoot(),
                platform_express_1.MulterModule.register({
                    dest: './files'
                }),
                sneakers_module_1.SneakersModule,
                users_module_1.UsersModule,
                images_module_1.ImagesModule,
                comments_module_1.CommentsModule,
                carts_module_1.CartsModule,
                invoices_module_1.InvoicesModule,
                cart_items_module_1.CartItemsModule,
                auth_module_1.AuthModule,
                brands_module_1.BrandsModule,
                product_types_module_1.ProductTypesModule,
            ],
            controllers: [app_controller_1.AppController],
            providers: [app_service_1.AppService, jwt_strategy_1.JwtStrategy]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
