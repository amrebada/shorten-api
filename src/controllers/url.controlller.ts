import URL from "../database/entities/url.entity";
import config from "../config";

class URLController {
  private generateShortURL(): string {
    const alphanumericMask =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    const shortURL = [];
    for (let i = 0; i < 8; i++) {
      shortURL.push(
        alphanumericMask.split("").sort(() => Math.random() - 0.5)[
          Math.floor(Math.random() * alphanumericMask.length)
        ]
      );
    }
    return shortURL.join("");
  }

  private formateShortURL(shortURL: string): string {
    return `https://${config.DOMAIN}/${shortURL}`;
  }

  async listURLs(limit: number, offset = 0) {
    return (await URL.find().skip(offset).limit(limit).exec()).map((url) => {
      url.shortURL = this.formateShortURL(url.shortURL);
      return url;
    });
  }

  private async getUniqueShortURL(): Promise<string> {
    const shortURL = this.generateShortURL();
    const saved = await URL.findOne({ shortURL });
    if (saved) {
      return await this.getUniqueShortURL();
    }
    return shortURL;
  }

  async createNewShortURL(fullURL: string) {
    const shortURL = await this.getUniqueShortURL();
    const url = new URL({
      fullURL,
      shortURL,
    });

    const newURL = await url.save();
    newURL.shortURL = this.formateShortURL(newURL.shortURL);
    return newURL;
  }
}

export default URLController;
