"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.InvoicesModule = void 0;
var common_1 = require("@nestjs/common");
var invoices_service_1 = require("./invoices.service");
var invoices_controller_1 = require("./invoices.controller");
var invoice_entity_1 = require("./entities/invoice.entity");
var typeorm_1 = require("@nestjs/typeorm");
var users_module_1 = require("../users/users.module");
var InvoicesModule = /** @class */ (function () {
    function InvoicesModule() {
    }
    InvoicesModule = __decorate([
        (0, common_1.Module)({
            imports: [typeorm_1.TypeOrmModule.forFeature([invoice_entity_1.Invoice]), (0, common_1.forwardRef)(function () { return users_module_1.UsersModule; })],
            controllers: [invoices_controller_1.InvoicesController],
            providers: [invoices_service_1.InvoicesService]
        })
    ], InvoicesModule);
    return InvoicesModule;
}());
exports.InvoicesModule = InvoicesModule;
