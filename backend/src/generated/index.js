"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var prisma_lib_1 = require("prisma-client-lib");
var typeDefs = require("./prisma-schema").typeDefs;

var models = [
  {
    name: "Chat",
    embedded: false
  },
  {
    name: "Course",
    embedded: false
  },
  {
    name: "Difficulty",
    embedded: false
  },
  {
    name: "Message",
    embedded: false
  },
  {
    name: "Purchase",
    embedded: false
  },
  {
    name: "Role",
    embedded: false
  },
  {
    name: "Style",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  },
  {
    name: "Video",
    embedded: false
  }
];
exports.Prisma = prisma_lib_1.makePrismaClientClass({
  typeDefs,
  models,
  endpoint: `${process.env["PRISMA_ENDPOINT"]}`,
  secret: `${process.env["PRISMA_SECRET"]}`
});
exports.prisma = new exports.Prisma();
var models = [
  {
    name: "Chat",
    embedded: false
  },
  {
    name: "Course",
    embedded: false
  },
  {
    name: "Difficulty",
    embedded: false
  },
  {
    name: "Message",
    embedded: false
  },
  {
    name: "Purchase",
    embedded: false
  },
  {
    name: "Role",
    embedded: false
  },
  {
    name: "Style",
    embedded: false
  },
  {
    name: "User",
    embedded: false
  },
  {
    name: "Video",
    embedded: false
  }
];
