/* eslint-disable jsdoc/require-jsdoc */
import {
  SlashCommandBuilder,
  SlashCommandSubcommandBuilder,
} from "@discordjs/builders";
import { PermissionFlagsBits } from "discord.js";

import { Command } from "../interfaces/CommandInt";
import { createNotification } from "../notifications/createNotification";
import { viewNotification } from "../notifications/viewNotification";
import { errorHandler } from "../utils/errorHandler";

export const notification: Command = {
  data: new SlashCommandBuilder()
    .setName("notification")
    .setDescription("Handles logic for the notification system.")
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("create")
        .setDescription("Create a new notification!")
        .addChannelOption((option) =>
          option
            .setName("channel")
            .setDescription("The channel you want to send the notification in.")
            .setRequired(true)
        )
        .addNumberOption((option) =>
          option
            .setName("time")
            .setDescription(
              "How often, in minutes, you would like to send the notification"
            )
            .setRequired(true)
        )
        .addStringOption((option) =>
          option
            .setName("content")
            .setDescription("The content of the notification you want to send")
            .setRequired(true)
        )
    )
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("view")
        .setDescription("View information on an existing notification.")
        .addNumberOption((option) =>
          option
            .setName("number")
            .setDescription("The ID of the notification you want to view.")
            .setRequired(true)
        )
    )
    .addSubcommand(
      new SlashCommandSubcommandBuilder()
        .setName("delete")
        .setDescription("Delete a notification.")
        .addNumberOption((option) =>
          option
            .setName("number")
            .setRequired(true)
            .setDescription("The ID of the notification you want to delete.")
        )
    ),
  run: async (BOT, interaction) => {
    try {
      const { member } = interaction;

      if (
        !member ||
        typeof member.permissions === "string" ||
        !member.permissions.has(PermissionFlagsBits.ManageGuild)
      ) {
        await interaction.editReply({
          content: "You do not have permission to manage notifications.",
        });
        return;
      }

      const action = interaction.options.getSubcommand();

      switch (action) {
        case "create":
          await createNotification(BOT, interaction);
          break;
        case "view":
          await viewNotification(BOT, interaction);
          break;
        case "delete":
          break;
      }
    } catch (error) {
      errorHandler("Notifications", error);
    }
  },
};
