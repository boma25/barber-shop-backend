import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document} from "mongoose";
import { PasswordProtection } from "src/helper/password.protection";


export type UserDocument = User & Document


@Schema({timestamps:true})
export class User{
    @Prop({required:true})
    first_name:string

    @Prop({required:true})
    last_name:string

    @Prop({required:true, unique:true})
    email:string

    @Prop({required:true})
    password:string

    @Prop({required:true, default:'User'})
    Role:string

}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.pre('save', async function(next){

    if(this.isModified('password')){
        this.set('password',await PasswordProtection.encrypt(this.get('password')))
    }
    next()
})