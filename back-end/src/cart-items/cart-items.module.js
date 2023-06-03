"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CartItemsModule = void 0;
var common_1 = require("@nestjs/common");
var cart_items_service_1 = require("./cart-items.service");
var cart_items_controller_1 = require("./cart-items.controller");
var cart_item_entity_1 = require("./entities/cart-item.entity");
var typeorm_1 = require("@nestjs/typeorm");
var sneakers_module_1 = require("../sneakers/sneakers.module");
var CartItemsModule = /** @class */ (function () {
    function CartItemsModule() {
    }
    CartItemsModule = __decorate([
        (0, common_1.Module)({
            imports: [
                typeorm_1.TypeOrmModule.forFeature([cart_item_entity_1.CartItem]),
                (0, common_1.forwardRef)(function () { return sneakers_module_1.SneakersModule; }),
            ],
            controllers: [cart_items_controller_1.CartItemsController],
            providers: [cart_items_service_1.CartItemsService],
            exports: [cart_items_service_1.CartItemsService]
        })
    ], CartItemsModule);
    return CartItemsModule;
}());
exports.CartItemsModule = CartItemsModule;
