"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.post = void 0;
const user_1 = require("../../../models/user");
function post(app) {
    app.post("/user", (request, response) => __awaiter(this, void 0, void 0, function* () {
        const username = request.body.user_userName;
        const user = yield user_1.UserModel.getByUsername(username);
        response.status(200).send(user);
    }));
}
exports.post = post;
//# sourceMappingURL=post.js.map