import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import Search from "./components/Search";

export default async function Page() {
	const supabase = createServerComponentClient({ cookies });

	const { data } = await supabase.auth.getSession();

	if (!data.session) {
		return redirect("/auth");
	}

	return (
		<div className=" max-w-5xl mx-auto h-screen flex justify-center items-center">
			<div className="w-full h-80vh rounded-sm shadow-sm border flex flex-col p-5">
				<Search />
			</div>
		</div>
	);
}
