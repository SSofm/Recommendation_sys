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
exports.CommentsController = void 0;
var common_1 = require("@nestjs/common");
var swagger_decorator_1 = require("../../libs/core/src/docs/swagger.decorator");
var passport_1 = require("@nestjs/passport");
var CommentsController = /** @class */ (function () {
    function CommentsController(commentsService) {
        this.commentsService = commentsService;
    }
    CommentsController.prototype.create = function (bookId, createCommentDto) {
        return this.commentsService.create(bookId, createCommentDto);
    };
    CommentsController.prototype.findAll = function () {
        return this.commentsService.findAll();
    };
    CommentsController.prototype.findOne = function (id) {
        return this.commentsService.findOne(+id);
    };
    CommentsController.prototype.getAllComments = function (userId) {
        return this.commentsService.getAllCommentsByUserId(userId);
    };
    // @Patch(':id')
    // update(@Param('id') id: string, @Body() updateCommentDto: UpdateCommentDto) {
    //   return this.commentsService.update(+id, updateCommentDto);
    // }
    CommentsController.prototype.remove = function (id) {
        return this.commentsService.remove(+id);
    };
    __decorate([
        (0, common_1.Post)('create-new-comment/:bookId'),
        __param(0, (0, common_1.Param)('bookId')),
        __param(1, (0, common_1.Body)())
    ], CommentsController.prototype, "create");
    __decorate([
        (0, common_1.Get)()
    ], CommentsController.prototype, "findAll");
    __decorate([
        (0, common_1.Get)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], CommentsController.prototype, "findOne");
    __decorate([
        (0, common_1.Get)('get-all-comments-by-userId/:userId'),
        __param(0, (0, common_1.Param)('userId'))
    ], CommentsController.prototype, "getAllComments");
    __decorate([
        (0, common_1.Delete)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], CommentsController.prototype, "remove");
    CommentsController = __decorate([
        (0, swagger_decorator_1.ApiTagsAndBearer)('Comments'),
        (0, common_1.Controller)('comments'),
        (0, common_1.UseGuards)((0, passport_1.AuthGuard)())
    ], CommentsController);
    return CommentsController;
}());
exports.CommentsController = CommentsController;
