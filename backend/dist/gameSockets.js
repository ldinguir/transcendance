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
const room_1 = require("./room");
let GameSockets = class GameSockets {
    constructor() {
        this.queueEasy = [];
        this.queueMed = [];
        this.queueHard = [];
        this.queueRev = [];
        this.rooms = [];
    }
    async handleJoinGame(client, mode) {
        console.log(`play request from : ${client.id}`);
        console.log(`Le mode est : ${mode}`);
        if (mode == ',easy') {
            console.log('on est entré dans easy !');
            this.queueEasy.push(client);
            if (this.queueEasy.length >= 2) {
                console.log(`player1 = ${this.queueEasy[0].id}`);
                console.log(`player2 = ${this.queueEasy[1].id}`);
                const room = new room_1.Room();
                room.player1 = this.queueEasy[0];
                room.player2 = this.queueEasy[1];
                this.queueEasy.splice(0, 2);
                console.log(`Room = ${room}`);
                this.rooms.push(room);
                this.startGame(room, 2);
            }
        }
        else if (mode == ',med') {
            this.queueMed.push(client);
            if (this.queueMed.length >= 2) {
                console.log(`player1 = ${this.queueMed[0].id}`);
                console.log(`player2 = ${this.queueMed[1].id}`);
                const room = new room_1.Room();
                room.player1 = this.queueMed[0];
                room.player2 = this.queueMed[1];
                this.queueMed.splice(0, 2);
                this.rooms.push(room);
                this.startGame(room, 4);
            }
        }
        else if (mode == ',hard') {
            this.queueHard.push(client);
            if (this.queueHard.length >= 2) {
                console.log(`player1 = ${this.queueHard[0].id}`);
                console.log(`player2 = ${this.queueHard[1].id}`);
                const room = new room_1.Room();
                room.player1 = this.queueHard[0];
                room.player2 = this.queueHard[1];
                this.queueHard.splice(0, 2);
                this.rooms.push(room);
                this.startGame(room, 6);
            }
        }
        else if (mode == ',rev') {
            this.queueRev.push(client);
            if (this.queueRev.length >= 2) {
                console.log(`player1 = ${this.queueRev[0].id}`);
                console.log(`player2 = ${this.queueRev[1].id}`);
                const room = new room_1.Room();
                room.player1 = this.queueRev[0];
                room.player2 = this.queueRev[1];
                this.queueRev.splice(0, 2);
                this.rooms.push(room);
                this.startGame(room, 4);
            }
        }
    }
    startGame(room, mode) {
        room.game = new game_1.Game();
        room.gameOpposant = new game_1.Game();
        console.log(`Le jeu va commencer entre ${room.player1.id} et ${room.player2.id}`);
        room.player1.emit('startGame');
        room.player2.emit('startGame');
        this.initGame(room.game, room.gameOpposant);
        room.game.ball.speed.x = mode;
        room.game.ball.speed.y = mode;
        room.gameOpposant.ball.speed.x = mode;
        room.gameOpposant.ball.speed.y = mode;
        const fct = setInterval(async () => {
            this.ballMove(room, fct);
        }, 20);
    }
    initGame(game, gameOpposant) {
        game.canvas = {
            height: 300,
            width: 600,
        };
        game.player =
            {
                x: 0,
                y: 100,
                height: 100,
                width: 10,
            };
        game.player2 =
            {
                x: 590,
                y: 100,
            };
        game.ball =
            {
                x: 300,
                y: 150,
                r: 5,
                speed: {
                    x: 0,
                    y: 0,
                }
            };
        gameOpposant.canvas = {
            height: 300,
            width: 600,
        };
        gameOpposant.player =
            {
                x: 0,
                y: 100,
                height: 100,
                width: 10,
            };
        gameOpposant.player2 =
            {
                x: 590,
                y: 100,
            };
        gameOpposant.ball =
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
    ballMove(room, fct) {
        if (room.game.ball.y < 0 || room.game.ball.y > room.game.canvas.height) {
            room.game.ball.speed.y *= -1;
            room.gameOpposant.ball.speed.y *= -1;
        }
        if (room.game.ball.x < room.game.player.width) {
            if ((room.game.ball.y > room.game.player.y) && (room.game.ball.y < room.game.player.y + room.game.player.height)) {
                room.game.ball.speed.x *= -1;
                room.gameOpposant.ball.speed.x *= -1;
            }
            else {
                room.player1.emit('gameOver', false);
                room.player2.emit('gameOver', true);
                var index = this.rooms.indexOf(room);
                if (index !== -1) {
                    this.rooms.splice(index, 1);
                }
                clearInterval(fct);
                console.log(`Il y a mtn ${this.rooms.length} rooms en cours`);
            }
        }
        if (room.game.ball.x > (room.game.canvas.width - room.game.player.width)) {
            if ((room.game.ball.y > room.game.player2.y) && (room.game.ball.y < room.game.player2.y + room.game.player.height)) {
                room.game.ball.speed.x *= -1;
                room.gameOpposant.ball.speed.x *= -1;
            }
            else {
                room.player1.emit('gameOver', true);
                room.player2.emit('gameOver', false);
                var index = this.rooms.indexOf(room);
                if (index !== -1) {
                    this.rooms.splice(index, 1);
                }
                clearInterval(fct);
                console.log(`Il y a mtn ${this.rooms.length} rooms en cours`);
            }
        }
        room.game.ball.x += room.game.ball.speed.x;
        room.game.ball.y += room.game.ball.speed.y;
        room.gameOpposant.ball.x -= room.game.ball.speed.x;
        room.gameOpposant.ball.y -= room.game.ball.speed.y;
        room.player1.emit('ballmove', room.game);
        room.player2.emit('ballmove', room.gameOpposant);
    }
    async handlePlayerMove(client, playerPosY) {
        console.log("________________________", playerPosY);
        for (let i = 0; i < this.rooms.length; i++) {
            if (client.id == this.rooms[i].player1.id) {
                this.rooms[i].gameOpposant.player2.y = (this.rooms[i].gameOpposant.canvas.height - playerPosY) - this.rooms[i].gameOpposant.player.height;
                this.rooms[i].game.player.y = playerPosY;
                break;
            }
            else if (client.id == this.rooms[i].player2.id) {
                this.rooms[i].game.player2.y = (this.rooms[i].game.canvas.height - playerPosY) - this.rooms[i].game.player.height;
                this.rooms[i].gameOpposant.player.y = playerPosY;
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
    __metadata("design:returntype", Promise)
], GameSockets.prototype, "handleJoinGame", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('playerMove'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Number]),
    __metadata("design:returntype", Promise)
], GameSockets.prototype, "handlePlayerMove", null);
GameSockets = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: "*",
        },
    })
], GameSockets);
exports.GameSockets = GameSockets;
//# sourceMappingURL=gameSockets.js.map