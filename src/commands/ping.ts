/* eslint-disable jsdoc/require-jsdoc */
import { SlashCommandBuilder } from "@discordjs/builders";
import { EmbedBuilder, TextChannel } from "discord.js";

import { Command } from "../interfaces/CommandInt";
import { errorHandler } from "../utils/errorHandler";

export const ping: Command = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Pings the bot!"),
  run: async (BOT, interaction) => {
    try {
      const { channel, createdTimestamp } = interaction;

      const timeDiff = Date.now() - createdTimestamp;

      const pongEmbed = new EmbedBuilder();

      pongEmbed.setTitle("Pong");
      pongEmbed.setDescription(`Response Time: ${timeDiff}ms`);

      await (channel as TextChannel).send({ embeds: [pongEmbed] });

      return;
    } catch (error) {
      errorHandler("ping command", error);
      await interaction.editReply({ content: "Something went wrong!" });
    }
  },
};
