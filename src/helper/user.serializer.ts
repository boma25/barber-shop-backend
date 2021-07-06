const SerializeUser =(user:any)=>{
    const oldUser = user?._doc||user
    const {password, ...newUser} = oldUser
    return newUser
}

export default SerializeUser