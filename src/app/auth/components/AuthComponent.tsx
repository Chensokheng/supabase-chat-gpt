"use client";
import React from "react";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default function AuthComponent() {
	const supabase = createClientComponentClient();

	const handleLoginWithGithub = () => {
		supabase.auth.signInWithOAuth({
			provider: "github",
			options: {
				redirectTo: location.origin + "/auth/callback",
			},
		});
	};

	return (
		<div className=" w-full h-screen flex justify-center items-center">
			<div className="w-96 border shadow-sm p-5 rounded-sm space-y-3">
				<h1 className=" font-bold text-lg">
					{"Welcome to Daily's AI"}
				</h1>
				<p className="text-sm">
					{
						" It is platform that build using Supabase and Chatgpt's API to create a ChatGPT like that can answer with our own knowledeg base."
					}
				</p>
				<Button
					className="w-full bg-indigo-500"
					onClick={handleLoginWithGithub}
				>
					Login With Github
				</Button>
			</div>
		</div>
	);
}
