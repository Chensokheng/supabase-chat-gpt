import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function page() {
	const supabase = createServerComponentClient({ cookies });

	const { data } = await supabase.auth.getSession();

	if (!data.session) {
		return redirect("/auth");
	}

	const { data: user } = await supabase
		.from("users")
		.select("role")
		.eq("id", data.session.user.id)
		.single();

	if (user?.role !== "admin") {
		return redirect("/");
	}

	return (
		<div>
			<h1>dataset</h1>
		</div>
	);
}
