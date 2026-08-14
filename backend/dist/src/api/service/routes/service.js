"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    routes: [
        {
            method: 'GET',
            path: '/services',
            handler: 'service.find',
            config: { policies: [] }
        },
        {
            method: 'GET',
            path: '/services/:id',
            handler: 'service.findOne',
            config: { policies: [] }
        },
        {
            method: 'POST',
            path: '/services',
            handler: 'service.create',
            config: { policies: [] }
        }
    ]
};
