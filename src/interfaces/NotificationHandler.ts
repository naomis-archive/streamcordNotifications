import { ChatInputCommandInteraction } from "discord.js";

import { Bot } from "./Bot";

export type NotificationHandler = (
  BOT: Bot,
  interaction: ChatInputCommandInteraction
) => Promise<void>;
