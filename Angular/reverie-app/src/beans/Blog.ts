import { Expose } from "class-transformer"; //The @Expose() decorator defines if eligible for transformation when serializing or deserializing an object.
import { IsNumber, IsString } from "class-validator";

export class Blog {
  @IsString()
  @Expose()
  blog_id?: string;

  @IsString()
  @Expose()
  user_id?: string;

  @IsString()
  @Expose()
  title?: string;

  @IsString()
  @Expose()
  tags?: string[];

  @IsString()
  @Expose()
  content?: string;

  @IsNumber()
  @Expose()
  created_at?: number;
}
