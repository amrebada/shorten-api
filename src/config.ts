export default class {
  public static readonly PORT: number =
    parseInt(process.env.PORT as string) || 5000;
  public static readonly MONGO_URL: string = process.env.MONGO_URL || "";
  public static readonly DOMAIN: string = process.env.DOMAIN || "";
}
