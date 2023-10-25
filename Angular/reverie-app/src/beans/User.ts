import { Expose } from "class-transformer";
import { IsArray, IsNumber, IsString } from "class-validator";

export class User {
  @IsString()
  @Expose()
  user_id?: string;

  @IsString()
  @Expose()
  email?: string;

  @IsString()
  @Expose()
  name?: string;

  @IsString()
  @Expose()
  profession?: string;

  @IsArray()
  @Expose()
  socials?: Object;

  @IsString()
  @Expose()
  password?: string;
}
