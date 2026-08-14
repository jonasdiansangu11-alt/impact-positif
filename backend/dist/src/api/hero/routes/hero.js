"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    routes: [
        {
            method: 'GET',
            path: '/hero',
            handler: 'hero.find',
            config: { policies: [] }
        },
    ]
};
