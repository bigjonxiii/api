import mongoose from 'mongoose';

interface IProxy extends mongoose.Document {
  uri: string;
  crawled_at: Date;
  verified_at: Date;
  is_valid: boolean;
}

const ProxySchema = new mongoose.Schema(
  {
    uri: String,
    crawled_at: Date,
    verified_at: Date,
    is_valid: Boolean,
  },
  { collection: 'proxy' }
);

export const Proxy = mongoose.model<IProxy>('Proxy', ProxySchema);
