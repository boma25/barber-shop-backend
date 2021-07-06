import { Injectable } from "@nestjs/common"

@Injectable()
export class FormatDate{
    getDateString(date:Date):string{
        const year = new Date(date).getUTCFullYear()
        const month = new Date(date).getMonth()+1
        const day = new Date(date).getDate()

        return `${year}-${month}-${day}`
    }

    compareDate(checkDate:Date, verifyDate:Date){
         if(this.getDateString(checkDate) === this.getDateString(new Date(verifyDate))){
            return true
        }
        return false
    }
}