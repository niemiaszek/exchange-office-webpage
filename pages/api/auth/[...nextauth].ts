import NextAuth, { type NextAuthOptions } from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';  
import path from 'path';
import { promises as fs } from 'fs';
import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET
      }),    
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      // let isAllowedToSignIn = false

      const jsonDirectory = path.join(process.cwd(), 'data');
      const fileContents = await fs.readFile(jsonDirectory + '/hashed_whitelist.json', 'utf8');
      const whitelist: Array<string> = JSON.parse(fileContents)

      const compareWithWhitelist = async (whitelist: Array<string>) => {
        let isWhitelisted = false
        for (let whitelistEntry of whitelist) {
          const result = await bcrypt.compare(user.email, whitelistEntry)
          if (result) {isWhitelisted = true}
        }
        return isWhitelisted
      }
      const isAllowedToSignIn = await compareWithWhitelist(whitelist)
      
      
      // encrypt the whitelist with mails not to store raw mails on github...
      // const saltRounds = 10;
      // var hashedWhitelist = await Promise.all(whitelist.map(async whitelistEntry => {
      //   return await bcrypt.hash(whitelistEntry, saltRounds)
      // })
      // )
      // await fs.writeFile(jsonDirectory + '/hashed_whitelist.json', JSON.stringify(hashedWhitelist), 'utf8');

      // if (whitelist.includes(user.email)) {isAllowedToSignIn = true}

      if (isAllowedToSignIn) {
        return true
      } else {
        // Return false to display a default error message
        return false
        // Or you can return a URL to redirect to:
        // return '/unauthorized'
      }
    }
  }
  
};

export default NextAuth(authOptions);