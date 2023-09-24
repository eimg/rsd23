import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import Link from "next/link";

export function Sidebar({ className, genres }) {
	return (
		<div className={cn("pb-12", className)}>
			<div className="space-y-4 py-4">
				<div className="px-3 py-2">
					<h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
						Genres
					</h2>
					<div className="space-y-1">
						{genres.map(genre => {
							return (
								<div key={genre.id}>
									<Link
										href={`/genre/${genre.name}/${genre.id}`}>
										<Button
											variant="secondary"
											className="w-full justify-start">
											<svg
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												fill="none"
												stroke="currentColor"
												strokeWidth="2"
												strokeLinecap="round"
												strokeLinejoin="round"
												className="mr-2 h-4 w-4">
												<circle
													cx="12"
													cy="12"
													r="10"
												/>
												<polygon points="10 8 16 12 10 16 10 8" />
											</svg>
											{genre.name}
										</Button>
									</Link>
								</div>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
