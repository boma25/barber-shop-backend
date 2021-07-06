import { Schema, Prop, SchemaFactory } from "@nestjs/mongoose";
import {Document, Types} from 'mongoose'
import { User } from "src/user/schemas/user.schema";


export type BookDocument = Book & Document


@Schema({timestamps: true})
export class Book{

    @Prop({required:true})
    date:Date

    @Prop({required: true})
    time:string

    @Prop({required: true, type:Types.ObjectId, ref:User.name})
    user:User
}


export const BookSchema = SchemaFactory.createForClass(Book)