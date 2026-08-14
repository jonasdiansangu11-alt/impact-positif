"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    routes: [
        {
            method: 'GET',
            path: '/about',
            handler: 'about.find',
            config: { policies: [] }
        },
    ]
};
