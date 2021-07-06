import SerializeUser from "./user.serializer"

const SerializeBook =(books:any)=>{
    if(books.length){
     const newBooks=[]
        books?.forEach((value,index)=>{
            const test = SerializeUser(value)
            newBooks[index]={...test,user:SerializeUser(value.user)}
        })
    return newBooks
}
const test = SerializeUser(books)
return {...test,user:SerializeUser(books.user)}

}

export default SerializeBook