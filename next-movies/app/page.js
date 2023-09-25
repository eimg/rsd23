import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

import { AlbumArtwork } from "@/components/album-artwork";

import Link from "next/link";

export const metadata = {
	title: "Next Movie",
	description: "Yet another movie app",
};

async function fetchPopulars() {
	const res = await fetch("https://api.themoviedb.org/3/movie/popular", {
		headers: {
			Authorization: `Bearer ${process.env.API_KEY}`,
		},
	});

	if(!res.ok) return false;
	const data = await res.json();
	return data.results;
}

async function fetchTops() {
	const res = await fetch("https://api.themoviedb.org/3/movie/top_rated", {
		headers: {
			Authorization: `Bearer ${process.env.API_KEY}`,
		},
	});

	if (!res.ok) return false;
	const data = await res.json();
	return data.results;
}

async function fetchTrending() {
	const res = await fetch("https://api.themoviedb.org/3/trending/movie/day", {
		headers: {
			Authorization: `Bearer ${process.env.API_KEY}`,
		},
	});

	if (!res.ok) return false;
	const data = await res.json();
	return data.results;
}

export default async function MusicPage() {
	const populars = await fetchPopulars();
	const trending = await fetchTrending();
	const tops = await fetchTops();

	return (
		<>
			<div className="col-span-3 lg:col-span-4 lg:border-l">
				<div className="h-full px-4 py-6 lg:px-8">
					<div className="flex items-center justify-between">
						<div className="space-y-1">
							<h2 className="text-2xl font-semibold tracking-tight">
								Popular
							</h2>
							<p className="text-sm text-muted-foreground">
								Most popular right now
							</p>
						</div>
					</div>
					<Separator className="my-4" />
					<div className="relative">
						<ScrollArea>
							<div className="flex space-x-4 pb-4">
								{populars.map(movie => (
									<div className="text-center">
										<Link href={`/detail/${movie.id}`}>
											<AlbumArtwork
												key={movie.id}
												movie={movie}
												className="w-[250px]"
												aspectRatio="portrait"
												width={250}
												height={330}
											/>
										</Link>
									</div>
								))}
							</div>
							<ScrollBar orientation="horizontal" />
						</ScrollArea>
					</div>

					<div className="flex items-center justify-between mt-5">
						<div className="space-y-1">
							<h2 className="text-2xl font-semibold tracking-tight">
								Trending
							</h2>
							<p className="text-sm text-muted-foreground">
								Up and coming
							</p>
						</div>
					</div>
					<Separator className="my-4" />
					<div className="relative">
						<ScrollArea>
							<div className="flex space-x-4 pb-4">
								{trending.map(movie => (
									<div className="text-center">
										<Link href={`/detail/${movie.id}`}>
										<AlbumArtwork
											key={movie.id}
											movie={movie}
											className="w-[250px]"
											aspectRatio="portrait"
											width={250}
											height={330}
										/>
										</Link>
									</div>
								))}
							</div>
							<ScrollBar orientation="horizontal" />
						</ScrollArea>
					</div>

					<div className="mt-6 space-y-1">
						<h2 className="text-2xl font-semibold tracking-tight">
							Top Rated
						</h2>
						<p className="text-sm text-muted-foreground">
							All time greatest
						</p>
					</div>
					<Separator className="my-4" />
					<div className="relative">
						<ScrollArea>
							<div className="flex space-x-4 pb-4">
								{tops.map(movie => (
									<div className="text-center">
										<Link href={`/detail/${movie.id}`}>
										<AlbumArtwork
											key={movie.name}
											movie={movie}
											className="w-[150px]"
											aspectRatio="square"
											width={150}
											height={150}
										/>
										</Link>
									</div>
								))}
							</div>
							<ScrollBar orientation="horizontal" />
						</ScrollArea>
					</div>
				</div>
			</div>
		</>
	);
}
