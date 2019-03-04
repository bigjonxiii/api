import mongoose from 'mongoose';

interface IProxy extends mongoose.Document {
  ip: string;
  port: string;
  username: string;
  password: string;
  crawled_at: Date;
  verified_at: Date;
  is_valid: boolean;
}

const ProxySchema = new mongoose.Schema(
  {
    ip: String,
    schema: String,
    port: String,
    username: String,
    password: String,
    crawled_at: Date,
    verified_at: Date,
    is_valid: Boolean,
  },
  { collection: 'proxy' }
);

export const Proxy = mongoose.model<IProxy>('Proxy', ProxySchema);
