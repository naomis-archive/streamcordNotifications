import { REST } from "@discordjs/rest";
import { APIApplicationCommandOption, Routes } from "discord-api-types/v10";

import { Bot } from "../interfaces/Bot";

import { errorHandler } from "./errorHandler";

/**
 * POSTs the command data to the Discord API to load commands.
 *
 * @param {Bot} BOT The discord bot instance.
 * @returns {boolean} True if successful, false if failed.
 */
export const registerCommands = async (BOT: Bot): Promise<boolean> => {
  try {
    const rest = new REST({ version: "10" }).setToken(BOT.token);

    const commandData: {
      name: string;
      description?: string;
      type?: number;
      option?: APIApplicationCommandOption[];
    }[] = [];

    BOT.commands.forEach((command) => commandData.push(command.data.toJSON()));

    await rest.put(Routes.applicationGuildCommands(BOT.botId, BOT.homeId), {
      body: commandData,
    });
    return true;
  } catch (error) {
    errorHandler("command registrar", error);
    return false;
  }
};
