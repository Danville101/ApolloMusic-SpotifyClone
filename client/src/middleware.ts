import { NextRequest, NextResponse } from "next/server";


export function middleware(req: NextRequest, res: NextResponse){
     const access = req.cookies.get("access_token_AppolloMusic")
  

     if( access && req.url.includes("login")|| access && req.url.includes("signup")){

      return NextResponse.rewrite(new URL("/", req.url))
      
     }

     if(access){
      NextResponse.json({"Logged":"True"})
     }
    

     return NextResponse.next();
}



export const config ={
  matcher:  '/((?!api|_next/static|_next/image|favicon.ico).*)'
}