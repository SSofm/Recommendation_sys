"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Brand = void 0;
var typeorm_1 = require("typeorm");
var product_type_entity_1 = require("../../product-types/entities/product-type.entity");
var Brand = /** @class */ (function () {
    function Brand() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Brand.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)()
    ], Brand.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)({ "default": '', nullable: true })
    ], Brand.prototype, "desc");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return product_type_entity_1.ProductType; }, function (productType) { return productType.brand; })
    ], Brand.prototype, "productTypes");
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' })
    ], Brand.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' })
    ], Brand.prototype, "updatedAt");
    Brand = __decorate([
        (0, typeorm_1.Entity)()
    ], Brand);
    return Brand;
}());
exports.Brand = Brand;
