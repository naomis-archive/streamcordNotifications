import {
  SlashCommandBuilder,
  SlashCommandSubcommandsOnlyBuilder,
} from "@discordjs/builders";
import { ChatInputCommandInteraction } from "discord.js";

import { Bot } from "./Bot";

export interface Command {
  data: SlashCommandBuilder | SlashCommandSubcommandsOnlyBuilder;
  /**
   * Handles the logic for running a given command.
   *
   * @param {Bot} BOT BOT's Discord instance.
   * @param {ChatInputCommandInteraction} interaction The interaction payload from Discord.
   */
  run: (BOT: Bot, interaction: ChatInputCommandInteraction) => Promise<void>;
}
