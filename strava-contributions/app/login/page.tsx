"use client";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function Login() {
  const params = useSearchParams();
  const code = params.get("code");
  const scope = params.get("scope");
  const router = useRouter();

  useEffect(() => {
    if (code && scope) {
      const fetchToken = async () => {
        try {
          const response = await fetch(
            "https://www.strava.com/api/v3/oauth/token",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                client_id: "120867",
                client_secret: "fe1b78cff0a30f2ac1559a5351d722713fa642f4",
                code: code,
                grant_type: "authorization_code",
              }),
            }
          );

          if (response.ok) {
            const data = await response.json();
            localStorage.setItem("strava_token", data.access_token);
            router.push("/graph");
          } else {
            console.error("Failed to exchange token");
          }
        } catch (error) {
          console.error("Error exchanging token:", error);
        }
      };

      fetchToken();
    }
  }, [code, router, scope]);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <h1>Logging in...</h1>
    </main>
  );
}
