// import { NextRequest, NextResponse } from "next/server";


// export async function POST(req:NextRequest):Promise<NextResponse>{

//     const {userName,email,password } = await req.json()
     
//     if(!userName || !email || !password){
//         return NextResponse.json({message:'You need to enter all the fields'},{status:400})
//     }

//     const userExixts = localStorage.getItem('registered')

//     //TODO Any type




    
//     let allUser = []
    
//     if(userExixts !==  null){
//         allUser = JSON.parse(userExixts)
//     }
//     const findUser = allUser.find((user) => user === email)
    
        
//         const newUser:CreateNewUser ={
//             userId:crypto.randomUUID(),
//             userName:userName,
//             email:email,
//             password:password       
//         }
        
//         allUser.push(newUser)


//      localStorage.setItem("registered", JSON.stringify(allUser))

//         console.log(allUser)

//     return NextResponse.json({message:'Register Created'},{status:201})

// }