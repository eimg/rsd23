import Image from "next/image";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

import { cn } from "@/lib/utils";

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
			<div className="h-full px-4 py-6">
				<h2 className="text-2xl mb-1">
					{movie.title} ({movie.release_date.split("-")[0]})
				</h2>

				<div className="text-sm text-muted-foreground mb-3">
					{movie.genres.map(genere => {
						return (
							<Badge variant="outeline" className="me-2">
								{genere.name}
							</Badge>
						);
					})}
				</div>

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
					<div className="flex flex-wrap">
						{credits.map(person => (
							<div className="text-center w-[128px] mb-4 me-4">
								<Link href={`/person/${person.id}`}>
									{person.profile_path ? (
										<Image
											alt=""
											src={`${profile_img_path}${person.profile_path}`}
											width={128}
											height={192}
											className={cn(
												"h-auto w-auto object-cover transition-all hover:scale-105",
											)}
										/>
									) : (
										<div className="h-[192px] bg-slate-500 opacity-20"></div>
									)}
								</Link>
								<h2>{person.name}</h2>
								<p className="text-xs text-muted-foreground">
									As {person.character}
								</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
