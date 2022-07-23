/* eslint-disable jsdoc/require-jsdoc */
import { EmbedBuilder } from "discord.js";

import { NotificationHandler } from "../interfaces/NotificationHandler";
import { errorHandler } from "../utils/errorHandler";

export const viewNotification: NotificationHandler = async (
  BOT,
  interaction
) => {
  try {
    const number = interaction.options.getNumber("number", true);

    const target = BOT.notifications[number];

    if (!target) {
      await interaction.editReply({
        content: "That is not a valid notification number",
      });
      return;
    }

    const notificationEmbed = new EmbedBuilder();
    notificationEmbed.setTitle(`Notification ${number}`);
    notificationEmbed.addFields([
      {
        name: "Channel",
        value: `<#${target.channelId}>`,
      },
      {
        name: "Frequency",
        value: `${target.frequency} minutes`,
      },
      {
        name: "Content",
        value: target.content,
      },
    ]);

    await interaction.editReply({ embeds: [notificationEmbed] });
  } catch (error) {
    errorHandler("view notification", error);
  }
};
