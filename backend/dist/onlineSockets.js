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
exports.OnlineSockets = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
let OnlineSockets = class OnlineSockets {
    constructor() {
        this.users = [];
    }
    handleConnection(client) {
        const clientID = client.id;
        this.users.push(client.id);
        client.emit('clientInfo', clientID);
        this.sendOnlineUsers(this.users);
    }
    handleDisconnect(client) {
        this.users = this.users.filter(item => item !== client.id);
        this.sendOnlineUsers(this.users);
    }
    sendOnlineUsers(users) {
        this.server.emit('onlineUsers', this.users);
    }
};
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], OnlineSockets.prototype, "server", void 0);
OnlineSockets = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: "*",
        },
    })
], OnlineSockets);
exports.OnlineSockets = OnlineSockets;
//# sourceMappingURL=onlineSockets.js.map