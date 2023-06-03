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
exports.CartsService = void 0;
var common_1 = require("@nestjs/common");
// import { UpdateCartDto } from './dto/update-cart.dto';
var typeorm_1 = require("@nestjs/typeorm");
var cart_entity_1 = require("./entities/cart.entity");
var sneakers_service_1 = require("../sneakers/sneakers.service");
var CartsService = /** @class */ (function () {
    function CartsService(cartRepository, booksService) {
        this.cartRepository = cartRepository;
        this.booksService = booksService;
    }
    CartsService.prototype.create = function () {
        var cart = new cart_entity_1.Cart();
        return this.cartRepository.save(cart);
    };
    CartsService.prototype.createWithBody = function (createCartDto) {
        return this.cartRepository.save(createCartDto);
    };
    CartsService.prototype.findAll = function () {
        return this.cartRepository.find();
    };
    CartsService.prototype.findOne = function (id) {
        return this.cartRepository.find({
            where: {
                id: id
            },
            relations: ['cartitems', 'cartitems.book']
        });
    };
    // update(id: number, updateCartDto: UpdateCartDto) {
    //   return `This action updates a #${id} cart`;
    // }
    CartsService.prototype.remove = function (id) {
        return "This action removes a #".concat(id, " cart");
    };
    CartsService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(cart_entity_1.Cart)),
        __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(function () { return sneakers_service_1.BooksService; })))
    ], CartsService);
    return CartsService;
}());
exports.CartsService = CartsService;
