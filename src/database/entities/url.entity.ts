import {
  Schema,
  SchemaTypes,
  model,
  Document,
  Model,
  SchemaType,
} from "mongoose";

const URLSchema = new Schema({
  fullURL: {
    type: SchemaTypes.String,
    unique: true,
  },
  shortURL: {
    type: SchemaTypes.String,
    unique: true,
  },
  createdAt: {
    type: SchemaTypes.Date,
    default: new Date(),
  },
});

export interface IURL extends Document {
  fullURL: string;
  shortURL: string;
}

export interface IURLModal extends Model<IURL> {}

export default model<IURL, IURLModal>("URL", URLSchema);
