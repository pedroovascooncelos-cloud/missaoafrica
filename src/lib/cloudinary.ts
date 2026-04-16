import crypto from "node:crypto";

import { v2 as cloudinary } from "cloudinary";

import { appEnv, hasCloudinaryConfig } from "@/lib/env";

export function getCloudinaryConfig() {
  if (!hasCloudinaryConfig()) {
    throw new Error("Cloudinary não configurado.");
  }

  cloudinary.config({
    cloud_name: appEnv.cloudinary.cloudName,
    api_key: appEnv.cloudinary.apiKey,
    api_secret: appEnv.cloudinary.apiSecret,
  });

  return {
    cloudName: appEnv.cloudinary.cloudName,
    apiKey: appEnv.cloudinary.apiKey,
    uploadFolder: appEnv.cloudinary.uploadFolder,
  };
}

export function createCloudinaryUploadSignature(params: Record<string, string | number>) {
  const sorted = Object.entries(params)
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join("&");

  const signature = crypto
    .createHash("sha1")
    .update(`${sorted}${appEnv.cloudinary.apiSecret}`)
    .digest("hex");

  return signature;
}
