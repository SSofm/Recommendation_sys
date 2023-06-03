"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CartItem = void 0;
var sneaker_entity_1 = require("../../sneakers/entities/sneaker.entity");
var typeorm_1 = require("typeorm");
var cart_entity_1 = require("../../carts/entities/cart.entity");
var invoice_entity_1 = require("../../invoices/entities/invoice.entity");
var CartItem = /** @class */ (function () {
    function CartItem() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], CartItem.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)()
    ], CartItem.prototype, "quantity");
    __decorate([
        (0, typeorm_1.Column)({ "default": 0, nullable: true })
    ], CartItem.prototype, "saleOff");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return cart_entity_1.Cart; }, function (cart) { return cart.cartitems; }, {
            onDelete: 'SET NULL'
        })
    ], CartItem.prototype, "cart");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return invoice_entity_1.Invoice; }, function (invoice) { return invoice.cartitems; }, {
            onDelete: 'SET NULL'
        })
    ], CartItem.prototype, "invoice");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return sneaker_entity_1.Sneaker; }, function (sneaker) { return sneaker.cartItems; }, {
            onDelete: 'SET NULL'
        })
    ], CartItem.prototype, "sneaker");
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' })
    ], CartItem.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' })
    ], CartItem.prototype, "updatedAt");
    CartItem = __decorate([
        (0, typeorm_1.Entity)()
    ], CartItem);
    return CartItem;
}());
exports.CartItem = CartItem;
