import {typedModel, createSchema, GetSchemaType} from "ts-mongoose";
import {SchemaOptions} from "mongoose";

export class Model {
    public schema?: any;
    public options?: SchemaOptions;
    protected build() {
        createSchema(this.schema, this.options)
    }
}
