import Image from "next/image";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import Link from "next/link";

async function fetchDetail(id) {
	const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
		headers: {
			Authorization: `Bearer ${process.env.API_KEY}`,
		},
	});

	if (!res.ok) return false;
	return await res.json();
}

async function fetchCredits(id) {
	const res = await fetch(
		`https://api.themoviedb.org/3/movie/${id}/credits`,
		{
			headers: {
				Authorization: `Bearer ${process.env.API_KEY}`,
			},
		},
	);

	if (!res.ok) return false;
	const data = await res.json();
	return data.cast;
}

export default async function DetailPage({ params }) {
	const movie = await fetchDetail(params.id);
	const credits = await fetchCredits(params.id);

	const img_path = "http://image.tmdb.org/t/p/" + "w1280";
	const profile_img_path = "http://image.tmdb.org/t/p/" + "w185";

	return (
		<div className="col-span-3 lg:col-span-4 lg:border-l">
			<div className="h-full px-4 py-6 lg:px-8">
				<h2 className="text-2xl mb-2">
					{movie.title} ({movie.release_date.split("-")[0]})
				</h2>
				<Image
					src={`${img_path}${movie.backdrop_path}`}
					width={1280}
					height={500}
					className="rounded-lg"
				/>
				<p className="mt-4 text-gray-800">{movie.overview}</p>

				<div className="mt-6 space-y-1">
					<h2 className="text-2xl font-semibold tracking-tight">
						Starring
					</h2>
				</div>
				<Separator className="my-4" />
				<div className="relative">
					<ScrollArea>
						<div className="flex space-x-4 pb-4">
							{credits.map(person => (
								<div className="text-center w-[128px]">
									<Link href={`/person/${person.id}`}>
										<Image
											alt={person.name}
											src={`${profile_img_path}${person.profile_path}`}
											width={128}
											height={128}
										/>
									</Link>
									<h2>{person.name}</h2>
									<p className="text-xs text-muted-foreground">
										As {person.character}
									</p>
								</div>
							))}
						</div>
						<ScrollBar orientation="horizontal" />
					</ScrollArea>
				</div>
			</div>
		</div>
	);
}
