import Image from "next/image";

import { cn } from "@/lib/utils";

export function AlbumArtwork({
	movie,
	aspectRatio = "portrait",
	width,
	height,
	className,
	...props
}) {
	const img_path = "http://image.tmdb.org/t/p/" + "w342";

	return (
		<div className={cn("space-y-3", className)} {...props}>
			<div className="overflow-hidden rounded-md">
				<Image
					src={`${img_path}${movie.poster_path}`}
					alt={movie.title}
					width={width}
					height={height}
					className={cn(
						"h-auto w-auto object-cover transition-all hover:scale-105",
						aspectRatio === "portrait"
							? "aspect-[3/4]"
							: "aspect-square",
					)}
				/>
			</div>
			<div className="space-y-1 text-sm">
				<h3 className="font-medium leading-none">{movie.name}</h3>
				<p className="text-xs text-muted-foreground">{movie.artist}</p>
			</div>
		</div>
	);
}
