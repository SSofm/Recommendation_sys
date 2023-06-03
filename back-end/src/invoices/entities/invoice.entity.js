"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Invoice = void 0;
var typeorm_1 = require("typeorm");
var cart_item_entity_1 = require("../../cart-items/entities/cart-item.entity");
var user_entity_1 = require("../../users/entities/user.entity");
var Invoice = /** @class */ (function () {
    function Invoice() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Invoice.prototype, "id");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return cart_item_entity_1.CartItem; }, function (cartitem) { return cartitem.invoice; }, {
            eager: true
        })
    ], Invoice.prototype, "cartitems");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, function (user) { return user.invoices; })
    ], Invoice.prototype, "user");
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' })
    ], Invoice.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' })
    ], Invoice.prototype, "updatedAt");
    Invoice = __decorate([
        (0, typeorm_1.Entity)()
    ], Invoice);
    return Invoice;
}());
exports.Invoice = Invoice;
