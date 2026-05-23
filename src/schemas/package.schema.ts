import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PackageDocument = HydratedDocument<Package>;

@Schema()
export class Package {
  @Prop()
  uploadData: Date;

  @Prop()
  size: string;

  @Prop([String])
  dependencies: string[];

  @Prop({
    type: {
      scripts: Array<string>,
      version: String,
      name: String,
    },
  })
  packageJsonInfo: {
    scripts: string[];
    version: string;
    name: string;
  };

  @Prop([String])
  flags: string[];

  @Prop({ type: Map, of: String })
  previousMetadata: Map<string, string>;
}

export const PackageSchema = SchemaFactory.createForClass(Package);
