import Link from "next/link";

export default function Home() {
  const clientID = 120867;
  const URL = `http://www.strava.com/oauth/authorize?client_id=${clientID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_URL}/login&approval_prompt=force&scope=activity:read_all`;
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 gap-6">
      <h1 className="text-4xl font-bold">Fitness Contributions</h1>
      <Link className="p-4 bg-orange-400 text-white" href={URL}>
        Connect with Strava
      </Link>
    </main>
  );
}
