"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
//GET /Home Screen.
const index = async (req, res) => {
    res.render("index", { title: "the new age" });
};
exports.index = index;
//# sourceMappingURL=index.js.map