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
exports.ProductTypesController = void 0;
var common_1 = require("@nestjs/common");
var jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
var swagger_decorator_1 = require("../../libs/core/src/docs/swagger.decorator");
var ProductTypesController = /** @class */ (function () {
    function ProductTypesController(productTypesService) {
        this.productTypesService = productTypesService;
    }
    ProductTypesController.prototype.create = function (createProductTypeDto) {
        return this.productTypesService.create(createProductTypeDto);
    };
    ProductTypesController.prototype.findAll = function () {
        return this.productTypesService.findAll();
    };
    ProductTypesController.prototype.findOne = function (id) {
        return this.productTypesService.findOne(+id);
    };
    ProductTypesController.prototype.update = function (id, updateProductTypeDto) {
        return this.productTypesService.update(+id, updateProductTypeDto);
    };
    ProductTypesController.prototype.remove = function (id) {
        return this.productTypesService.remove(+id);
    };
    __decorate([
        (0, common_1.Post)('create-new-product-type'),
        __param(0, (0, common_1.Body)())
    ], ProductTypesController.prototype, "create");
    __decorate([
        (0, common_1.Get)('get-all-product-types')
    ], ProductTypesController.prototype, "findAll");
    __decorate([
        (0, common_1.Get)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], ProductTypesController.prototype, "findOne");
    __decorate([
        (0, common_1.Patch)(':id'),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Body)())
    ], ProductTypesController.prototype, "update");
    __decorate([
        (0, common_1.Delete)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], ProductTypesController.prototype, "remove");
    ProductTypesController = __decorate([
        (0, swagger_decorator_1.ApiTagsAndBearer)('Product Types'),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.Controller)('product-types')
    ], ProductTypesController);
    return ProductTypesController;
}());
exports.ProductTypesController = ProductTypesController;
