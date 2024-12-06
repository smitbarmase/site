import fs from "fs/promises";
import path from "path";

import type { Book, PostBookMap, Section } from "../types";
import {
  createFilenameWithExtension,
  Logger,
  APIError,
  fileExists,
  optimizeAndSaveImage,
} from "../helper";

import { COVERS_DIR, PAGE_COUNT_MAP_PATH, SECTIONS_PATH } from "../constants";

class GoogleBooksService {
  async getPageCount(book: Book): Promise<number | null> {
    try {
      const query = `${encodeURIComponent(book.book_title)} ${encodeURIComponent(book.author_name)}`;
      const { items } = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}`,
      ).then((res) => {
        if (!res.ok)
          throw new APIError(`Failed to fetch page count`, res.status);
        return res.json();
      });

      return items?.[0]?.volumeInfo?.pageCount ?? null;
    } catch (error) {
      Logger.error(`Error fetching page count for ${book.book_title}:`, error);
      return null;
    }
  }
}

class BookCoverService {
  async fetchCoverUrl(book: Book): Promise<string | null> {
    try {
      const searchQuery = `${encodeURIComponent(book.book_title)} ${encodeURIComponent(book.author_name)}`;
      const searchResponse = await fetch(
        `https://openlibrary.org/search.json?q=${searchQuery}`,
      );
      const searchData = await searchResponse.json();

      if (!searchResponse.ok || !searchData.docs?.[0]?.isbn?.[0]) {
        throw new APIError(`No ISBN found for book`, searchResponse.status);
      }

      const isbn = searchData.docs[0].isbn[0];
      return `https://covers.openlibrary.org/b/isbn/${isbn}-L.jpg`;
    } catch (error) {
      Logger.error(`Error fetching cover for ${book.book_title}:`, error);
      return null;
    }
  }

  async downloadAndOptimize(url: string, filepath: string): Promise<void> {
    const response = await fetch(url);

    if (!response.ok) {
      throw new APIError(`Failed to download image: ${response.status}`);
    }

    const buffer = await response.arrayBuffer();
    await optimizeAndSaveImage(buffer, filepath);
  }
}

class BookProcessingService {
  private bookMap: PostBookMap = {};
  private googleBooksService = new GoogleBooksService();
  private bookCoverService = new BookCoverService();

  async loadExistingBookMap(): Promise<void> {
    try {
      this.bookMap = JSON.parse(
        await fs.readFile(PAGE_COUNT_MAP_PATH, "utf-8"),
      );
    } catch {
      Logger.info("No existing page count map found, creating new file");
    }
  }

  async processBook(
    book: Book,
  ): Promise<{ title: string; hours: number } | null> {
    Logger.info("Processing book:", book.book_title);

    await this.processCoverImage(book);
    const readingTime = await this.processReadingTime(book);

    if (readingTime) {
      return {
        title: book.book_title,
        hours: readingTime,
      };
    }

    return null;
  }

  private async processCoverImage(book: Book): Promise<boolean> {
    const filepath = path.join(
      COVERS_DIR,
      createFilenameWithExtension(book.book_title),
    );

    if (await fileExists(filepath)) {
      Logger.info(`Cover already exists for "${book.book_title}"`);
      return true;
    }

    const coverUrl = await this.bookCoverService.fetchCoverUrl(book);
    if (!coverUrl) return false;

    await this.bookCoverService.downloadAndOptimize(coverUrl, filepath);
    Logger.info(`Downloaded cover for "${book.book_title}"`);
    return true;
  }

  private async processReadingTime(book: Book): Promise<number | null> {
    if (this.bookMap[book.book_title] !== undefined) {
      return this.bookMap[book.book_title];
    }

    return await this.googleBooksService.getPageCount(book);
  }

  async processBatch(books: Book[]): Promise<void> {
    for (const book of books) {
      const result = await this.processBook(book);
      if (result) {
        this.bookMap[result.title] = result.hours;
        Logger.info("Added reading time for:", result.title);
      }
    }
  }

  async saveBookMap(): Promise<void> {
    await fs.writeFile(
      PAGE_COUNT_MAP_PATH,
      JSON.stringify(this.bookMap, null, 2),
      "utf-8",
    );
    Logger.info("Page count map saved to", PAGE_COUNT_MAP_PATH);
  }
}

async function main() {
  try {
    const processor = new BookProcessingService();

    const sections: Section[] = JSON.parse(
      await fs.readFile(SECTIONS_PATH, "utf-8"),
    );
    await processor.loadExistingBookMap();

    Logger.info("Starting processing of", sections.length, "sections");

    for (const section of sections) {
      Logger.info(`Processing section with ${section.books.length} books`);
      await processor.processBatch(section.books);
    }

    await processor.saveBookMap();
    Logger.info("Processing completed successfully");
  } catch (error) {
    Logger.error("Fatal error in main execution:", error);
    process.exit(1);
  }
}

main();
