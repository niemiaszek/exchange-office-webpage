import fs from "fs";
import path from "path";
const directory = process.cwd() + "/.next/cache/fetch-cache";

export default async function handler(req, res) {
    // Check for secret to confirm this is a valid request
    if (req.query.secret !== process.env.REVALIDATE) {
      return res.status(401).json({ message: 'Invalid token' });
    }
  
    try {
        fs.readdir(directory, (err, files) => {
            if (err) throw err;
            for (const file of files) {
                    fs.unlink(path.join(directory, file), (err) => {if (err) throw err})}})
      
      // This should be the actual path not a rewritten path
      // e.g. for "/blog/[slug]" this should be "/blog/post-1"
      await res.revalidate('/');
      return res.json({ revalidated: true });
    } catch (err) {
      // If there was an error, Next.js will continue
      // to show the last successfully generated page
      console.log(err)
      return res.status(500).send('Error revalidating');
    }
  }
  