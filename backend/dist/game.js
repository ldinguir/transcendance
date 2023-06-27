"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Game = void 0;
class Game {
    constructor() {
        this.canvas = { height: 300, width: 600 };
        this.player = { x: 0, y: 100, height: 100, width: 10 };
        this.player2 = { x: 590, y: 100 };
        this.ball = { x: 300, y: 150, r: 5, speed: { x: 2, y: 2 } };
    }
}
exports.Game = Game;
//# sourceMappingURL=game.js.map