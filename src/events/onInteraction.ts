import { Interaction } from "discord.js";

import { Bot } from "../interfaces/Bot";

/**
 *
 * @param {Bot} BOT The Discord bot instance.
 * @param {Interaction} interaction The interaction payload from Discord.
 */
export const onInteraction = async (
  BOT: Bot,
  interaction: Interaction
): Promise<void> => {
  if (!interaction.isChatInputCommand()) {
    return;
  }

  for (const command of BOT.commands) {
    if (interaction.commandName === command.data.name) {
      await interaction.deferReply({ ephemeral: true });
      await command.run(BOT, interaction);
      break;
    }
  }
};
