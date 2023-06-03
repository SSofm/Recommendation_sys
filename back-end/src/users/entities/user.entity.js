"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.User = void 0;
var typeorm_1 = require("typeorm");
var comment_entity_1 = require("../../comments/entities/comment.entity");
var cart_entity_1 = require("../../carts/entities/cart.entity");
var invoice_entity_1 = require("../../invoices/entities/invoice.entity");
var bcrypt = require("bcrypt");
var User = /** @class */ (function () {
    function User() {
    }
    User.prototype.comparePassword = function (rawPassword) {
        var userPassword = this.password;
        return bcrypt.compareSync(rawPassword, userPassword);
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], User.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)()
    ], User.prototype, "username");
    __decorate([
        (0, typeorm_1.Column)()
    ], User.prototype, "email");
    __decorate([
        (0, typeorm_1.Column)()
    ], User.prototype, "password");
    __decorate([
        (0, typeorm_1.Column)()
    ], User.prototype, "age");
    __decorate([
        (0, typeorm_1.Column)({ nullable: true, "default": null })
    ], User.prototype, "roleId");
    __decorate([
        (0, typeorm_1.Column)({ "default": false })
    ], User.prototype, "isAdmin");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return comment_entity_1.Comment; }, function (comment) { return comment.user; }, {
        // eager: true,
        })
    ], User.prototype, "comments");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return invoice_entity_1.Invoice; }, function (invoice) { return invoice.user; })
    ], User.prototype, "invoices");
    __decorate([
        (0, typeorm_1.OneToOne)(function () { return cart_entity_1.Cart; }, {
            eager: true
        }),
        (0, typeorm_1.JoinColumn)()
    ], User.prototype, "cart");
    __decorate([
        (0, typeorm_1.CreateDateColumn)({ type: 'timestamptz' })
    ], User.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.UpdateDateColumn)({ type: 'timestamptz' })
    ], User.prototype, "updatedAt");
    User = __decorate([
        (0, typeorm_1.Entity)()
    ], User);
    return User;
}());
exports.User = User;
