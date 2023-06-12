"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GameSockets = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const game_1 = require("./game");
let GameSockets = class GameSockets {
    constructor() {
        this.queueEasy = [];
        this.queueMed = [];
        this.queueHard = [];
        this.queueRev = [];
        this.rooms = [];
        this.game = new game_1.Game();
        this.gameOpposant = new game_1.Game();
    }
    handleJoinGame(client, mode) {
        console.log(`play request from : ${client.id}`);
        console.log(`Le mode est : ${mode}`);
        if (mode == ',easy') {
            console.log('on est entré dans easy !');
            this.queueEasy.push(client);
            if (this.queueEasy.length >= 2) {
                console.log(`player1 = ${this.queueEasy[0]}`);
                console.log(`player2 = ${this.queueEasy[1]}`);
                const room = [this.queueEasy[0], this.queueEasy[1]];
                this.queueEasy.splice(0, 2);
                console.log(`Room = ${room}`);
                this.rooms.push(room);
                this.startGame(room);
            }
        }
        else if (mode == ',med') {
            this.queueMed.push(client);
            if (this.queueMed.length >= 2) {
                console.log(`player1 = ${this.queueMed[0]}`);
                console.log(`player2 = ${this.queueMed[1]}`);
                const room = [this.queueMed[0], this.queueMed[1]];
                this.queueMed.splice(0, 2);
                this.rooms.push(room);
                this.startGame(room);
            }
        }
        else if (mode == ',hard') {
            this.queueHard.push(client);
            if (this.queueHard.length >= 2) {
                console.log(`player1 = ${this.queueHard[0]}`);
                console.log(`player2 = ${this.queueHard[1]}`);
                const room = [this.queueHard[0], this.queueHard[1]];
                this.queueHard.splice(0, 2);
                this.rooms.push(room);
                this.startGame(room);
            }
        }
        else if (mode == ',rev') {
            this.queueRev.push(client);
            if (this.queueRev.length >= 2) {
                console.log(`player1 = ${this.queueRev[0]}`);
                console.log(`player2 = ${this.queueRev[1]}`);
                const room = [this.queueRev[0], this.queueRev[1]];
                this.queueRev.splice(0, 2);
                this.rooms.push(room);
                this.startGame(room);
            }
        }
    }
    startGame(room) {
        console.log(`Le jeu va commencer entre ${room[0].id} et ${room[1].id}`);
        room.forEach((player) => { player.emit('startGame'); });
        this.initGame();
        setInterval(() => {
            this.ballMove(room);
        }, 50);
    }
    initGame() {
        this.game.canvas = {
            height: 300,
            width: 600,
        };
        this.game.player =
            {
                x: 0,
                y: 100,
                height: 100,
                width: 10,
            };
        this.game.player2 =
            {
                x: 590,
                y: 100,
            };
        this.game.ball =
            {
                x: 300,
                y: 150,
                r: 5,
                speed: {
                    x: 2,
                    y: 2,
                }
            };
        this.gameOpposant.canvas = {
            height: 300,
            width: 600,
        };
        this.gameOpposant.player =
            {
                x: 0,
                y: 100,
                height: 100,
                width: 10,
            };
        this.gameOpposant.player2 =
            {
                x: 590,
                y: 100,
            };
        this.gameOpposant.ball =
            {
                x: 300,
                y: 150,
                r: 5,
                speed: {
                    x: -2,
                    y: -2,
                }
            };
    }
    ballMove(room) {
        if (this.game.ball.y < 0 || this.game.ball.y > this.game.canvas.height) {
            this.game.ball.speed.y *= -1;
            this.gameOpposant.ball.speed.y *= -1;
        }
        if (this.game.ball.x < this.game.player.width) {
            if ((this.game.ball.y > this.game.player.y) && (this.game.ball.y < this.game.player.y + this.game.player.height)) {
                this.game.ball.speed.x *= -1;
                this.gameOpposant.ball.speed.x *= -1;
            }
            else {
                this.initGame();
            }
        }
        if (this.game.ball.x > (this.game.canvas.width - this.game.player.width)) {
            if ((this.game.ball.y > this.game.player2.y) && (this.game.ball.y < this.game.player2.y + this.game.player.height)) {
                this.game.ball.speed.x *= -1;
                this.gameOpposant.ball.speed.x *= -1;
            }
            else {
                this.initGame();
            }
        }
        this.game.ball.x += this.game.ball.speed.x;
        this.game.ball.y += this.game.ball.speed.y;
        this.gameOpposant.ball.x -= this.game.ball.speed.x;
        this.gameOpposant.ball.y -= this.game.ball.speed.y;
        console.log(`ballX = ${this.game.ball.x}`);
        console.log(`ballY = ${this.game.ball.y}`);
        room[0].emit('ballmove', this.game);
        room[1].emit('ballmove', this.gameOpposant);
    }
    handlePlayerMove(client, playerPosY) {
        const stop = 0;
        for (let i = 0; i < this.rooms.length; i++) {
            for (let j = 0; j < 2; j++) {
                if (client.id == (this.rooms[i][j]).id) {
                    if (j == 0) {
                        this.gameOpposant.player2.y = playerPosY;
                    }
                    else {
                        this.game.player2.y = playerPosY;
                    }
                    break;
                }
            }
            if (stop) {
                break;
            }
        }
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], GameSockets.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinGame'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, String]),
    __metadata("design:returntype", void 0)
], GameSockets.prototype, "handleJoinGame", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('playerMove'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Number]),
    __metadata("design:returntype", void 0)
], GameSockets.prototype, "handlePlayerMove", null);
GameSockets = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: "*",
        },
    }),
    __metadata("design:paramtypes", [])
], GameSockets);
exports.GameSockets = GameSockets;
//# sourceMappingURL=gameSockets.js.map