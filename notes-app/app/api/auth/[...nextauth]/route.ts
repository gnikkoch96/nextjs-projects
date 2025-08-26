import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "text", placeholder: "Enter your email" },
                password: { label: "Password", type: "password", placeholder: "Enter your password" }
            },

            async authorize(credentials, req) {
                const user = { id: "1", name: "User", email: "user@example.com" };
                
                if(user.email === credentials?.email && credentials?.password === "password") {
                    return user;
                }else{
                    return null;
                }
            }
        })
    ]

}

export default NextAuth(authOptions);