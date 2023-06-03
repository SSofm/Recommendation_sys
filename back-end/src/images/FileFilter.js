"use strict";
exports.__esModule = true;
exports.imageFileFilter = void 0;
var imageFileFilter = function (req, file, callback) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
        return callback(new Error('Only image files are allowed!'), false);
    }
    callback(null, true);
};
exports.imageFileFilter = imageFileFilter;
