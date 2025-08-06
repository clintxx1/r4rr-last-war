import { getUploadAuthParams } from "@imagekit/next/server";
import { NextResponse } from "next/server";

const imagekitPublicKey = process.env.IMAGEKIT_PUBLIC_KEY as string;
const imagekitPrivateKey = process.env.IMAGEKIT_PRIVATE_KEY as string;

export async function GET() {
  const { token, expire, signature } = getUploadAuthParams({
    privateKey: imagekitPrivateKey,
    publicKey: imagekitPublicKey,
  });

  return NextResponse.json({
    token,
    expire,
    signature,
    publicKey: imagekitPublicKey,
  });
}
