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
exports.SneakersController = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var swagger_decorator_1 = require("../../libs/core/src/docs/swagger.decorator");
var jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
var SneakersController = /** @class */ (function () {
    function SneakersController(booksService) {
        this.booksService = booksService;
    }
    SneakersController.prototype.create = function (createSneakerDto, images) {
        return this.booksService.create(createSneakerDto, images);
    };
    SneakersController.prototype.addSingleSneakerIntoCart = function (cartItemDto, bookId) {
        return this.booksService.addSingleBookIntoCart(cartItemDto, bookId);
    };
    SneakersController.prototype.findAll = function () {
        return this.booksService.findAll();
    };
    SneakersController.prototype.findOne = function (id) {
        return this.booksService.findOne(+id);
    };
    // @Get('get-all-books-of-cart/:cartId')
    // findBooksInCart(@Param('cartId') cartId: number) {
    //   return this.booksService.findBooksInCart(cartId);
    // }
    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateBookDto: UpdateBookDto) {
    //   return this.booksService.update(+id, updateBookDto);
    // }
    SneakersController.prototype.removeSingleBookFromCart = function (cart, bookId) {
        return this.booksService.removeSingleBookFromCart(cart.cartId, bookId);
    };
    SneakersController.prototype.remove = function (id) {
        return this.booksService.remove(+id);
    };
    __decorate([
        (0, common_1.Post)('create-new-sneaker'),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Body)())
    ], SneakersController.prototype, "create");
    __decorate([
        (0, common_1.Post)('add-single-sneaker-into-cart/:sneakerId'),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Param)('sneakerId'))
    ], SneakersController.prototype, "addSingleSneakerIntoCart");
    __decorate([
        (0, common_1.Get)('get-all-sneakers')
    ], SneakersController.prototype, "findAll");
    __decorate([
        (0, common_1.Get)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], SneakersController.prototype, "findOne");
    __decorate([
        (0, common_1.Delete)('remove-single-book-from-cart/:bookId'),
        __param(0, (0, common_1.Body)()),
        __param(1, (0, common_1.Param)('bookId'))
    ], SneakersController.prototype, "removeSingleBookFromCart");
    __decorate([
        (0, common_1.Delete)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], SneakersController.prototype, "remove");
    SneakersController = __decorate([
        (0, swagger_1.ApiTags)('Sneakers'),
        (0, swagger_decorator_1.ApiTagsAndBearer)('Sneakers'),
        (0, common_1.Controller)('sneakers')
    ], SneakersController);
    return SneakersController;
}());
exports.SneakersController = SneakersController;
