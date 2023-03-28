import { getServerSession } from "next-auth";
import Link from "next/link";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

export default async function Home() {
  const session = await getServerSession(authOptions);

  const isAuthenticated = !!session;

  return (
    <div>
      <pre>{JSON.stringify(session, null, 2)}</pre>;
      {isAuthenticated ? (
        <div>
          <p>Authenticated</p>
          <Link href="/api/auth/signout">SignOut</Link>
        </div>
      ) : (
        <div>
          <p>Not Authenticated</p>
          <Link href="/api/auth/signin/github">SignIn</Link>
        </div>
      )}
    </div>
  );
}
