"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Image = void 0;
var typeorm_1 = require("typeorm");
var sneaker_entity_1 = require("../../sneakers/entities/sneaker.entity");
var Image = /** @class */ (function () {
    function Image() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Image.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ type: 'varchar', nullable: true })
    ], Image.prototype, "url");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return sneaker_entity_1.Sneaker; }, function (book) { return book.images; }, {
            cascade: true,
            onDelete: 'CASCADE'
        })
    ], Image.prototype, "book");
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' })
    ], Image.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' })
    ], Image.prototype, "updatedAt");
    Image = __decorate([
        (0, typeorm_1.Entity)()
    ], Image);
    return Image;
}());
exports.Image = Image;
