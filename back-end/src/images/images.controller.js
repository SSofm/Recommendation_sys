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
exports.ImagesController = void 0;
var common_1 = require("@nestjs/common");
var platform_express_1 = require("@nestjs/platform-express");
var multer_1 = require("multer");
var FileFilter_1 = require("./FileFilter");
var EditFileName_1 = require("./EditFileName");
var swagger_decorator_1 = require("../../libs/core/src/docs/swagger.decorator");
var swagger_1 = require("@nestjs/swagger");
var ImagesController = /** @class */ (function () {
    function ImagesController(imagesService) {
        this.imagesService = imagesService;
    }
    ImagesController.prototype.create = function (createImageDto) {
        return this.imagesService.create(createImageDto);
    };
    ImagesController.prototype.updatedCoverImages = function (sneakerId, listImageUrls) {
        return this.imagesService.updatedCoverImages(sneakerId, listImageUrls);
    };
    ImagesController.prototype.handleUpload = function (files) {
        var listImagePaths = [];
        for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
            var element = files_1[_i];
            listImagePaths.push(element.path);
        }
        return listImagePaths;
    };
    ImagesController.prototype.findAll = function () {
        return this.imagesService.findAll();
    };
    ImagesController.prototype.findOne = function (id) {
        return this.imagesService.findOne(+id);
    };
    ImagesController.prototype.update = function (id, updateImageDto) {
        return this.imagesService.update(+id, updateImageDto);
    };
    ImagesController.prototype.remove = function (id) {
        return this.imagesService.remove(+id);
    };
    ImagesController.prototype.testDeleteFileLocal = function (fileName) {
        console.log('file name in image controller is: ', fileName);
        return this.imagesService.testDeleteFile(fileName);
    };
    __decorate([
        (0, common_1.Post)('create-new-image'),
        (0, swagger_decorator_1.ApiCreateOperation)({
            summary: 'Create new image'
        }),
        __param(0, (0, common_1.Body)())
    ], ImagesController.prototype, "create");
    __decorate([
        (0, common_1.Post)('updated-images-for-sneaker/:sneakerId'),
        (0, swagger_decorator_1.ApiUpdateOperation)({
            summary: 'Update image for sneaker'
        }),
        __param(0, (0, common_1.Param)('sneakerId')),
        __param(1, (0, common_1.Body)())
    ], ImagesController.prototype, "updatedCoverImages");
    __decorate([
        (0, common_1.Post)('upload-files'),
        (0, common_1.UseInterceptors)((0, platform_express_1.FilesInterceptor)('file', 20, {
            storage: (0, multer_1.diskStorage)({
                destination: '../front-end/public/images',
                filename: EditFileName_1.editFileName
            }),
            fileFilter: FileFilter_1.imageFileFilter
        })),
        (0, swagger_1.ApiConsumes)('multipart/form-data'),
        __param(0, (0, common_1.UploadedFiles)())
    ], ImagesController.prototype, "handleUpload");
    __decorate([
        (0, common_1.Get)(),
        (0, swagger_decorator_1.ApiListOperation)({
            summary: 'Get all image'
        })
    ], ImagesController.prototype, "findAll");
    __decorate([
        (0, common_1.Get)(':id'),
        (0, swagger_decorator_1.ApiRetrieveOperation)(),
        __param(0, (0, common_1.Param)('id'))
    ], ImagesController.prototype, "findOne");
    __decorate([
        (0, common_1.Patch)(':id'),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Body)())
    ], ImagesController.prototype, "update");
    __decorate([
        (0, common_1.Delete)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], ImagesController.prototype, "remove");
    __decorate([
        (0, common_1.Delete)('test-delete-file/:fileName'),
        __param(0, (0, common_1.Param)('fileName'))
    ], ImagesController.prototype, "testDeleteFileLocal");
    ImagesController = __decorate([
        (0, swagger_decorator_1.ApiTagsAndBearer)('Images'),
        (0, common_1.Controller)('images')
    ], ImagesController);
    return ImagesController;
}());
exports.ImagesController = ImagesController;
