"use strict";
exports.__esModule = true;
exports.editFileName = void 0;
var path_1 = require("path");
var editFileName = function (req, file, callback) {
    var name = file.originalname.split('.')[0];
    var fileExtName = (0, path_1.extname)(file.originalname);
    var randomName = Array(4)
        .fill(null)
        .map(function () { return Math.round(Math.random() * 16).toString(16); })
        .join('');
    callback(null, "".concat(name, "-").concat(randomName).concat(fileExtName));
};
exports.editFileName = editFileName;
