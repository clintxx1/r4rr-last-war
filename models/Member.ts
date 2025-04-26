import mongoose, { Schema, model, models } from "mongoose";

const MemberSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "N/A"],
      required: true,
    },
    level: {
      type: Number,
      required: true,
      default: 1,
    },
    alliancePosition: {
      type: String,
      enum: ["R5", "R4", "R3", "R2", "R1"],
      default: "R1",
    },
    positionDescription: {
      type: String,
      trim: true,
      required: false,
    },
    totalPower: {
      type: Number,
      required: true,
      default: 0,
    },
    powerUnit: {
      type: String,
      required: true,
      enum: ["M", "K"],
      trim: true,
    },
    enemyDefeated: {
      type: Number,
      required: true,
      default: 0,
    },
    defeatedUnit: {
      type: String,
      required: true,
      enum: ["M", "K"],
      trim: true,
    },
    likes: {
      type: Number,
      required: true,
      default: 0,
    },
    giftLevel: {
      type: Number,
      required: true,
      default: 0,
    },
    profile: {
      type: String,
      required: false,
      trim: true,
    },
    gallery: []
  },
  {
    timestamps: true,
  }
);

export default models.Member || model("Member", MemberSchema);
