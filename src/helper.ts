import fs from "fs/promises";
import sharp from "sharp";

export function createFilenameWithExtension(bookTitle: string): string {
  return bookTitle
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .concat(".webp");
}

export async function fileExists(filepath: string): Promise<boolean> {
  try {
    await fs.access(filepath);
    return true;
  } catch {
    return false;
  }
}

export class Logger {
  static info(message: string, ...args: any[]) {
    console.log(`[INFO] ${message}`, ...args);
  }

  static error(message: string, error?: any) {
    console.error(`[ERROR] ${message}`, error);
  }
}

export class APIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
  ) {
    super(message);
    this.name = "APIError";
  }
}

export async function optimizeAndSaveImage(
  buffer: ArrayBuffer,
  filepath: string,
): Promise<void> {
  await sharp(Buffer.from(buffer))
    .resize(512, null, {
      withoutEnlargement: true,
      fit: "inside",
    })
    .webp({
      quality: 80,
      effort: 6,
    })
    .toFile(filepath);
}
