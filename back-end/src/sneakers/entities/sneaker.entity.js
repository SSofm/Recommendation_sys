"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Sneaker = void 0;
var typeorm_1 = require("typeorm");
var image_entity_1 = require("../../images/entities/image.entity");
var comment_entity_1 = require("../../comments/entities/comment.entity");
var cart_item_entity_1 = require("../../../../../../../../../src/cart-items/entities/cart-item.entity");
var product_type_entity_1 = require("../../product-types/entities/product-type.entity");
var Sneaker = /** @class */ (function () {
    function Sneaker() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Sneaker.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)()
    ], Sneaker.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true })
    ], Sneaker.prototype, "productCode");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true })
    ], Sneaker.prototype, "desc");
    __decorate([
        (0, typeorm_1.Column)({ "default": 0, nullable: true })
    ], Sneaker.prototype, "stars");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true })
    ], Sneaker.prototype, "price");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return image_entity_1.Image; }, function (image) { return image.book; }, {
            eager: true
        })
    ], Sneaker.prototype, "images");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return comment_entity_1.Comment; }, function (comment) { return comment.book; }, {
            eager: true
        })
    ], Sneaker.prototype, "comments");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return cart_item_entity_1.CartItem; }, function (cartItem) { return cartItem.sneaker; })
    ], Sneaker.prototype, "cartItems");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return product_type_entity_1.ProductType; }, function (productType) { return productType.sneakers; })
    ], Sneaker.prototype, "productType");
    Sneaker = __decorate([
        (0, typeorm_1.Entity)()
    ], Sneaker);
    return Sneaker;
}());
exports.Sneaker = Sneaker;
