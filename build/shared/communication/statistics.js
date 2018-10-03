"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// function instead of constant to generate new references each time
function initial() {
    return {
        life: {
            kills: 0,
            length: 0,
        },
        session: {
            totals: {
                kills: 0,
                length: 0,
                deaths: 0,
            },
            kills: 0,
            length: 0,
            ratios: {
                kd: 0,
                ld: 0,
            },
        },
    };
}
exports.initial = initial;
