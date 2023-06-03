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
exports.BrandsController = void 0;
var common_1 = require("@nestjs/common");
var swagger_decorator_1 = require("../../libs/core/src/docs/swagger.decorator");
var jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
var BrandsController = /** @class */ (function () {
    function BrandsController(brandsService) {
        this.brandsService = brandsService;
    }
    BrandsController.prototype.create = function (createBrandDto) {
        return this.brandsService.create(createBrandDto);
    };
    BrandsController.prototype.findAll = function () {
        return this.brandsService.findAll();
    };
    BrandsController.prototype.findOne = function (id) {
        return this.brandsService.findOne(+id);
    };
    BrandsController.prototype.update = function (id, updateBrandDto) {
        return this.brandsService.update(+id, updateBrandDto);
    };
    BrandsController.prototype.remove = function (id) {
        return this.brandsService.remove(+id);
    };
    __decorate([
        (0, common_1.Post)(),
        (0, swagger_decorator_1.ApiCreateOperation)({
            summary: 'Create new brand'
        }),
        __param(0, (0, common_1.Body)())
    ], BrandsController.prototype, "create");
    __decorate([
        (0, common_1.Get)(),
        (0, swagger_decorator_1.ApiListOperation)()
    ], BrandsController.prototype, "findAll");
    __decorate([
        (0, common_1.Get)(':id'),
        (0, swagger_decorator_1.ApiRetrieveOperation)(),
        __param(0, (0, common_1.Param)('id'))
    ], BrandsController.prototype, "findOne");
    __decorate([
        (0, common_1.Patch)(':id'),
        (0, swagger_decorator_1.ApiUpdateOperation)(),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Body)())
    ], BrandsController.prototype, "update");
    __decorate([
        (0, common_1.Delete)(':id'),
        (0, swagger_decorator_1.ApiDeleteOperation)(),
        __param(0, (0, common_1.Param)('id'))
    ], BrandsController.prototype, "remove");
    BrandsController = __decorate([
        (0, swagger_decorator_1.ApiTagsAndBearer)('Brands'),
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.Controller)('brands')
    ], BrandsController);
    return BrandsController;
}());
exports.BrandsController = BrandsController;
