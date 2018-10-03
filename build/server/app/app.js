"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
exports.router = express.Router();
exports.name = 'snake';
const root = __dirname + '/../../../';
exports.router.get('/', (req, res) => res.sendFile('source/client/index.html', { root }));
exports.router.get('/js', (req, res) => res.sendFile('build/client/bundle.min.js', { root }));
exports.router.get('/icon', (req, res) => res.sendFile('source/client/icon.png', { root }));
