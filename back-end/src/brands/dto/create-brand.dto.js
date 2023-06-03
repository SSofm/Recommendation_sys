"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateBrandDto = void 0;
var swagger_1 = require("@nestjs/swagger");
var class_validator_1 = require("class-validator");
var CreateBrandDto = /** @class */ (function () {
    function CreateBrandDto() {
    }
    __decorate([
        (0, swagger_1.ApiProperty)({ example: '' }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)()
    ], CreateBrandDto.prototype, "name");
    __decorate([
        (0, swagger_1.ApiProperty)({ example: '' }),
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsOptional)()
    ], CreateBrandDto.prototype, "desc");
    return CreateBrandDto;
}());
exports.CreateBrandDto = CreateBrandDto;
