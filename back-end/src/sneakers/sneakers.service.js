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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.BooksService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var sneaker_entity_1 = require("./entities/sneaker.entity");
var image_entity_1 = require("../images/entities/image.entity");
var images_service_1 = require("../images/images.service");
var carts_service_1 = require("../carts/carts.service");
var cart_item_entity_1 = require("../cart-items/entities/cart-item.entity");
var cart_items_service_1 = require("../cart-items/cart-items.service");
var BooksService = /** @class */ (function () {
    function BooksService(sneakerRepository, imagesService, cartsService, cartItemsService, productTypeService) {
        this.sneakerRepository = sneakerRepository;
        this.imagesService = imagesService;
        this.cartsService = cartsService;
        this.cartItemsService = cartItemsService;
        this.productTypeService = productTypeService;
    }
    BooksService.prototype.create = function (createBookDto, images) {
        return __awaiter(this, void 0, void 0, function () {
            var checkSneaker, sneaker, tmp_images, listImages, _i, tmp_images_1, element, tmp_image, productType;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sneakerRepository.findOneBy({
                            name: createBookDto.name
                        })];
                    case 1:
                        checkSneaker = _a.sent();
                        if (checkSneaker) {
                            throw new common_1.HttpException('Sneaker title already exists', common_1.HttpStatus.CONFLICT);
                        }
                        sneaker = new sneaker_entity_1.Sneaker();
                        if (!images) return [3 /*break*/, 6];
                        tmp_images = images.imagePaths;
                        if (!tmp_images) return [3 /*break*/, 6];
                        listImages = [];
                        _i = 0, tmp_images_1 = tmp_images;
                        _a.label = 2;
                    case 2:
                        if (!(_i < tmp_images_1.length)) return [3 /*break*/, 5];
                        element = tmp_images_1[_i];
                        tmp_image = new image_entity_1.Image();
                        tmp_image.url = element;
                        return [4 /*yield*/, this.imagesService.create(tmp_image)];
                    case 3:
                        _a.sent();
                        listImages.push(tmp_image);
                        _a.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        sneaker.images = listImages;
                        _a.label = 6;
                    case 6: return [4 /*yield*/, this.productTypeService.getSneakerByName(createBookDto.productType)];
                    case 7:
                        productType = _a.sent();
                        sneaker.name = createBookDto.name;
                        sneaker.productType = productType;
                        sneaker.productCode = createBookDto.productCode;
                        sneaker.desc = createBookDto.desc;
                        sneaker.price = createBookDto.price;
                        return [4 /*yield*/, this.sneakerRepository.save(sneaker)];
                    case 8: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    // async create_with_out_images(createBookDto: CreateSneakerDto) {
    //   return await this.sneakerRepository.save(createBookDto);
    // }
    BooksService.prototype.addSingleBookIntoCart = function (cartItemDto, bookId) {
        return __awaiter(this, void 0, void 0, function () {
            var cart, sneaker, cartItem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cartsService.findOne(cartItemDto.cartId)];
                    case 1:
                        cart = _a.sent();
                        return [4 /*yield*/, this.findOne(bookId)];
                    case 2:
                        sneaker = _a.sent();
                        cartItem = new cart_item_entity_1.CartItem();
                        cartItem.cart = cart[0];
                        cartItem.quantity = cartItemDto.quantity;
                        cartItem.sneaker = sneaker;
                        return [4 /*yield*/, this.cartItemsService.create(cartItem)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    BooksService.prototype.findAll = function () {
        return this.sneakerRepository.find({
            relations: {
                productType: {
                    brand: true
                },
                images: true,
                comments: true
            }
        });
    };
    BooksService.prototype.findOne = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var sneaker;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sneakerRepository.findOneBy({ id: id })];
                    case 1:
                        sneaker = _a.sent();
                        if (!sneaker) {
                            throw new common_1.HttpException('Not found sneaker', common_1.HttpStatus.NOT_FOUND);
                        }
                        return [2 /*return*/, sneaker];
                }
            });
        });
    };
    // async findBooksInCart(cartId: number) {
    //   const cart = await this.cartsService.findOne(cartId);
    //   const listCart: Cart[] = [cart];
    //   return await this.sneakerRepository.findBy({ carts: listCart });
    // }
    // update(id: number, updateBookDto: UpdateBookDto) {
    //   return this.sneakerRepository.update({ id }, updateBookDto);
    // }
    BooksService.prototype.remove = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var book, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.sneakerRepository.findOneBy({ id: id })];
                    case 1:
                        book = _a.sent();
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < book.images.length)) return [3 /*break*/, 5];
                        // const filePath =
                        //   '../front-end/public/images/' + book.images[i].url.split('\\').pop();
                        return [4 /*yield*/, this.imagesService.testDeleteFile(book.images[i].url.split('\\').pop())];
                    case 3:
                        // const filePath =
                        //   '../front-end/public/images/' + book.images[i].url.split('\\').pop();
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5: return [4 /*yield*/, this.sneakerRepository["delete"]({ id: id })];
                    case 6: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BooksService.prototype.removeSingleBookFromCart = function (cartId, bookId) {
        return __awaiter(this, void 0, void 0, function () {
            var cart;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.cartsService.findOne(cartId)];
                    case 1:
                        cart = _a.sent();
                        cart[0].cartitems = cart[0].cartitems.filter(function (item) { return item.sneaker.id != bookId; });
                        return [4 /*yield*/, this.cartsService.createWithBody(cart)];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BooksService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(sneaker_entity_1.Sneaker)),
        __param(1, (0, common_1.Inject)((0, common_1.forwardRef)(function () { return images_service_1.ImagesService; }))),
        __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(function () { return carts_service_1.CartsService; }))),
        __param(3, (0, common_1.Inject)((0, common_1.forwardRef)(function () { return cart_items_service_1.CartItemsService; })))
    ], BooksService);
    return BooksService;
}());
exports.BooksService = BooksService;
