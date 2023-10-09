import React from "react";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { BsDatabase } from "react-icons/bs";
import Form from "./components/Form";

export default async function Page() {
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
		<div className="max-w-4xl mx-auto h-screen flex justify-center items-center">
			<div className="w-full p-5 space-y-3">
				<div className="flex items-center gap-2">
					<BsDatabase className="w-5 h-5" />
					<h1>Daily AI dataset</h1>
				</div>
				<Form />
			</div>
		</div>
	);
}
