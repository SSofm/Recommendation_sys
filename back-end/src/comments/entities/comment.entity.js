"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Comment = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../../users/entities/user.entity");
var sneaker_entity_1 = require("../../sneakers/entities/sneaker.entity");
var Comment = /** @class */ (function () {
    function Comment() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], Comment.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)()
    ], Comment.prototype, "star");
    __decorate([
        (0, typeorm_1.Column)()
    ], Comment.prototype, "content");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, function (user) { return user.comments; }, {
            eager: true,
            onDelete: 'SET NULL'
        })
    ], Comment.prototype, "user");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return sneaker_entity_1.Sneaker; }, function (book) { return book.comments; }, {
            onDelete: 'SET NULL'
        })
    ], Comment.prototype, "book");
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' })
    ], Comment.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' })
    ], Comment.prototype, "updatedAt");
    Comment = __decorate([
        (0, typeorm_1.Entity)()
    ], Comment);
    return Comment;
}());
exports.Comment = Comment;
