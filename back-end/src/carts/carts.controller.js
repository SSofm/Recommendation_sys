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
exports.CartsController = void 0;
var common_1 = require("@nestjs/common");
var swagger_decorator_1 = require("../../libs/core/src/docs/swagger.decorator");
var CartsController = /** @class */ (function () {
    function CartsController(cartsService) {
        this.cartsService = cartsService;
    }
    CartsController.prototype.create = function () {
        return this.cartsService.create();
    };
    CartsController.prototype.findAll = function () {
        return this.cartsService.findAll();
    };
    CartsController.prototype.findOne = function (id) {
        return this.cartsService.findOne(+id);
    };
    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateCartDto: UpdateCartDto) {
    //   return this.cartsService.update(+id, updateCartDto);
    // }
    CartsController.prototype.remove = function (id) {
        return this.cartsService.remove(+id);
    };
    __decorate([
        (0, common_1.Post)()
    ], CartsController.prototype, "create");
    __decorate([
        (0, common_1.Get)('get-all-carts')
    ], CartsController.prototype, "findAll");
    __decorate([
        (0, common_1.Get)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], CartsController.prototype, "findOne");
    __decorate([
        (0, common_1.Delete)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], CartsController.prototype, "remove");
    CartsController = __decorate([
        (0, swagger_decorator_1.ApiTagsAndBearer)('Carts'),
        (0, common_1.Controller)('carts')
    ], CartsController);
    return CartsController;
}());
exports.CartsController = CartsController;
