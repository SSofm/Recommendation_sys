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
exports.InvoicesController = void 0;
var common_1 = require("@nestjs/common");
var swagger_decorator_1 = require("../../libs/core/src/docs/swagger.decorator");
var InvoicesController = /** @class */ (function () {
    function InvoicesController(invoicesService) {
        this.invoicesService = invoicesService;
    }
    InvoicesController.prototype.create = function (createInvoiceDto) {
        return this.invoicesService.create(createInvoiceDto);
    };
    InvoicesController.prototype.findAll = function () {
        return this.invoicesService.findAll();
    };
    InvoicesController.prototype.findAllInvoicesByUserId = function (userId) {
        return this.invoicesService.findAllInvoicesByUserId(userId);
    };
    InvoicesController.prototype.findOne = function (id) {
        return this.invoicesService.findOne(+id);
    };
    InvoicesController.prototype.update = function (id, updateInvoiceDto) {
        return this.invoicesService.update(+id, updateInvoiceDto);
    };
    InvoicesController.prototype.remove = function (id) {
        return this.invoicesService.remove(+id);
    };
    __decorate([
        (0, common_1.Post)('create-new-invoice'),
        __param(0, (0, common_1.Body)())
    ], InvoicesController.prototype, "create");
    __decorate([
        (0, common_1.Get)()
    ], InvoicesController.prototype, "findAll");
    __decorate([
        (0, common_1.Get)('get-all-invoices-by-userId/:userId'),
        __param(0, (0, common_1.Param)('userId'))
    ], InvoicesController.prototype, "findAllInvoicesByUserId");
    __decorate([
        (0, common_1.Get)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], InvoicesController.prototype, "findOne");
    __decorate([
        (0, common_1.Patch)(':id'),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Body)())
    ], InvoicesController.prototype, "update");
    __decorate([
        (0, common_1.Delete)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], InvoicesController.prototype, "remove");
    InvoicesController = __decorate([
        (0, swagger_decorator_1.ApiTagsAndBearer)('Invoices'),
        (0, common_1.Controller)('invoices')
    ], InvoicesController);
    return InvoicesController;
}());
exports.InvoicesController = InvoicesController;
