import * as bcrypt from 'bcrypt';

export class PasswordProtection{
    static async encrypt(password:string):Promise<string>{
        const salt =10
        return  await bcrypt.hash(password,salt)
    }

    static async validate(password:string, hash:string):Promise<boolean>{
        return (await bcrypt.compare(password, hash))
    }
}