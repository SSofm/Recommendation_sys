"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.SneakersModule = void 0;
var common_1 = require("@nestjs/common");
var sneakers_service_1 = require("./sneakers.service");
var sneakers_controller_1 = require("./sneakers.controller");
var typeorm_1 = require("@nestjs/typeorm");
var sneaker_entity_1 = require("./entities/sneaker.entity");
var images_module_1 = require("../images/images.module");
var carts_module_1 = require("../carts/carts.module");
var cart_items_module_1 = require("../cart-items/cart-items.module");
var product_types_module_1 = require("../product-types/product-types.module");
var SneakersModule = /** @class */ (function () {
    function SneakersModule() {
    }
    SneakersModule = __decorate([
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([sneaker_entity_1.Sneaker]),
                (0, common_1.forwardRef)(function () { return images_module_1.ImagesModule; }),
                (0, common_1.forwardRef)(function () { return carts_module_1.CartsModule; }),
                (0, common_1.forwardRef)(function () { return cart_items_module_1.CartItemsModule; }),
                product_types_module_1.ProductTypesModule,
            ],
            controllers: [sneakers_controller_1.SneakersController],
            providers: [sneakers_service_1.BooksService],
            exports: [sneakers_service_1.BooksService]
        })
    ], SneakersModule);
    return SneakersModule;
}());
exports.SneakersModule = SneakersModule;
