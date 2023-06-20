import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";
import User from "@models/userModel";
import { connectToDB } from "@utils/dbConnection";

const handler = NextAuth({
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET
        })
    ],

    callbacks: {
        async session({session}) {
          const sessionUser = await User.findOne({email: session.user.email});
    
          session.user.id = sessionUser._id;
    
          return session;
        },
    
        async signIn({profile}) {
         // next js api routes are serverless function like  AWS lambda which means it is only going to spinup when request reaches to it 
    
         //serverless >> Lambda function >> dynamoDB
    
         // When it is going to be called first it has to spinup the server and then make a connection to the database.which means we don't have to keep our server running constantly like typical Node Express server.
    
         try {
    
            await connectToDB();
          console.log("Checking The profile variable", profile);
            // Here check if a user already exist in database
             const checkUserExists = await User.findOne({email: profile.email});
            // if user is not in database, create a new user AND save it to the database.
             if(!checkUserExists) {
               await User.create({
                email: profile.email,
                username: profile?.name?.replace(" ", "").toLowerCase(),
                Image: profile?.picture,
               })
             }
            return true;
            
         } catch (error) {
            console.log("error in signing In", error);
            return false;
         }
        }

    }

})

export {handler as GET, handler as POST};