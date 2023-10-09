"use client";
import React, { useRef, useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useToast } from "@/components/ui/use-toast";

export default function Form() {
	const supabase = createClientComponentClient();
	const { toast } = useToast();

	const inputRef = useRef() as React.MutableRefObject<HTMLTextAreaElement>;
	const [loading, setLoading] = useState(false);

	const toastError = (message = "Something went wrong") => {
		toast({
			title: "Fail to create embedding",
			description: message,
		});
	};

	const handleSubmit = async () => {
		setLoading(true);
		const content = inputRef.current.value;

		if (content && content.trim()) {
			const res = await fetch(location.origin + "/embedding", {
				method: "POST",
				body: JSON.stringify({ text: content.replace(/\n/g, " ") }),
			});

			if (res.status !== 200) {
				toastError();
			} else {
				const result = await res.json();
				const embedding = result.embedding;
				const token = result.token;

				const { error } = await supabase.from("documents").insert({
					content,
					embedding,
					token,
				});
				if (error) {
					toastError(error.message);
				} else {
					toast({
						title: "Successfully create embedding.",
					});
					inputRef.current.value = "";
				}
			}
		}
		setLoading(false);
	};

	return (
		<>
			<Textarea
				placeholder="Add your dataset"
				className="h-96"
				ref={inputRef}
			/>
			<Button className="w-full flex gap-2" onClick={handleSubmit}>
				{loading && (
					<AiOutlineLoading3Quarters className="w-5 h-5 animate-spin" />
				)}
				Submit
			</Button>
		</>
	);
}
