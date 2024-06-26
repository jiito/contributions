import Image from "next/image";
import Link from "next/link";

export default function Home() {
  const clientID = 120867;
  const URL = `http://www.strava.com/oauth/authorize?client_id=${clientID}&response_type=code&redirect_uri=${process.env.NEXT_PUBLIC_URL}/login&approval_prompt=force&scope=activity:read_all`;
  return (
    <main className="relative w-screen h-screen p-24">
      <h1 className="absolute top-0 italic text-[20rem] font-bold text-black ">
        crkd
      </h1>
      <div className="flex flex-row absolute left-96 top-1/2 transform -translate-y-1/2 gap-4">
        <div className="w-2 h-[50vh] bg-black"></div>
        <div className="flex-1 flex flex-col justify-center">
          <p className="text-[3rem] leading-10  text-black">
            Drop #1
            <br />
            <span className="text-[10rem] leading-[9rem] p-4 font-mono font-bold tracking-tighter ">
              activation ƒunction
            </span>
          </p>
          <Link className="p-4 bg-orange-500 text-white mt-10" href={URL}>
            Connect with Strava
          </Link>
        </div>
      </div>

      <h1 className="absolute bottom-0 italic text-[20rem] font-bold text-black ">
        clb
      </h1>

      {/* <h1 className="text-4xl font-bold text-black italic mb-8">
          activation ƒunction{" "}
        </h1> */}
      <div className="absolute bottom-4 right-4">
        <Image
          src="/1.2 strava api logos/powered by Strava/pwrdBy_strava_gray/api_logo_pwrdBy_strava_stack_gray.svg"
          alt="Strava logo"
          width={100}
          height={100}
        />
      </div>
    </main>
  );
}
