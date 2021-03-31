import { parseConfig } from "./functions/parse"
const config = parseConfig()
import { ShardingManager } from "discord.js";
const manager = new ShardingManager(__dirname + "/bot.js", {
  token: process.env.TOKEN,
});

manager.spawn();
