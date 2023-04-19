"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.index = void 0;
/**
 * GET /
 * Home page.
 */
const index = async (req, res) => {
    res.render("index", { title: "Express" });
};
exports.index = index;
//# sourceMappingURL=index.js.map