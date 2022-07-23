/* eslint-disable jsdoc/require-jsdoc */
import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder } from "discord.js";

import { Command } from "../interfaces/CommandInt";
import { errorHandler } from "../utils/errorHandler";

export const about: Command = {
  data: new SlashCommandBuilder()
    .setName("about")
    .setDescription("Provides information about the bot."),
  run: async (BOT, interaction) => {
    try {
      const aboutEmbed = new EmbedBuilder();

      aboutEmbed.setTitle("Streamcord Notifications");
      aboutEmbed.setDescription(
        "I am a bot created by [nhcarrigan](https://www.nhcarrigan.com) for the Streamcord Discord server. If you like what I do, please consider [supporting my development](https://github.com/sponsors/nhcarrigan). You can also [view my source code](https://www.github.com/nhcarrigan/streamcord-notifications)."
      );
      aboutEmbed.addFields([
        {
          name: "Bot Version",
          value: process.env.npm_package_version || "unknown",
          inline: true,
        },
        {
          name: "Creation Date",
          value: "11 October 2021",
          inline: true,
        },
        {
          name: "Active Notifications",
          value: Object.keys(BOT.notifications).length.toString(),
          inline: true,
        },
      ]);

      await interaction.editReply({ embeds: [aboutEmbed] });
    } catch (error) {
      errorHandler("about command", error);
    }
  },
};
