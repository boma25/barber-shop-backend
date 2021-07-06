import { ObjectId } from "mongoose";

export class CreateBookDto{
    date:Date;
    time:string;
    user:ObjectId
}