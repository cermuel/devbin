"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = void 0;
const notFound = (req, res) => res.status(404).json({ msg: "Not Found", statusCode: 404 });
exports.notFound = notFound;
//# sourceMappingURL=not-found.middleware.js.map