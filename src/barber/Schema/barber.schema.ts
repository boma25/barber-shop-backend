import { Schema, SchemaFactory, Prop } from "@nestjs/mongoose";
import { Document } from "mongoose";


export type BarberDocument = Barber & Document

@Schema({timestamps:true})
export class Barber{

    @Prop({required:true})
    number:number

    @Prop({required:true, unique: true})
    date:Date
}

export const BarberSchema = SchemaFactory.createForClass(Barber)