"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.CartItemsService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var cart_item_entity_1 = require("./entities/cart-item.entity");
var CartItemsService = /** @class */ (function () {
    function CartItemsService(cartItemRepository) {
        this.cartItemRepository = cartItemRepository;
    }
    CartItemsService.prototype.create = function (createCartItemDto) {
        return this.cartItemRepository.save(createCartItemDto);
    };
    CartItemsService.prototype.findAll = function () {
        return "This action returns all cartItems";
    };
    CartItemsService.prototype.findOne = function (id) {
        return "This action returns a #".concat(id, " cartItem");
    };
    CartItemsService.prototype.update = function (id, updateCartItemDto) {
        return "This action updates a #".concat(id, " cartItem");
    };
    CartItemsService.prototype.remove = function (id) {
        return "This action removes a #".concat(id, " cartItem");
    };
    CartItemsService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(cart_item_entity_1.CartItem))
    ], CartItemsService);
    return CartItemsService;
}());
exports.CartItemsService = CartItemsService;
