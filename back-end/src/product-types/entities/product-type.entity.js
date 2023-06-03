"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ProductType = void 0;
var typeorm_1 = require("typeorm");
var brand_entity_1 = require("../../brands/entities/brand.entity");
var sneaker_entity_1 = require("../../sneakers/entities/sneaker.entity");
var ProductType = /** @class */ (function () {
    function ProductType() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], ProductType.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)()
    ], ProductType.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)()
    ], ProductType.prototype, "desc");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return brand_entity_1.Brand; }, function (brand) { return brand.productTypes; })
    ], ProductType.prototype, "brand");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return sneaker_entity_1.Sneaker; }, function (sneaker) { return sneaker.productType; })
    ], ProductType.prototype, "sneakers");
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' })
    ], ProductType.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' })
    ], ProductType.prototype, "updatedAt");
    ProductType = __decorate([
        (0, typeorm_1.Entity)()
    ], ProductType);
    return ProductType;
}());
exports.ProductType = ProductType;
