"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    routes: [
        {
            method: 'GET',
            path: '/locations',
            handler: 'location.find',
            config: { policies: [] }
        },
        {
            method: 'GET',
            path: '/locations/:id',
            handler: 'location.findOne',
            config: { policies: [] }
        },
        {
            method: 'POST',
            path: '/locations',
            handler: 'location.create',
            config: { policies: [] }
        }
    ]
};
