import {
	Card,
	CardActionArea,
	CardContent,
	Box,
	Typography,
	Avatar,
} from "@mui/material";

export default function Home() {
	return (
		<Card sx={{ mb: 1 }} variant="outlined">
			<CardActionArea>
				<CardContent sx={{ display: "flex", p: 2 }}>
					<Box sx={{ mr: 3 }}>
						<Avatar
							alt="Profile Picture"
							sx={{
								width: 64,
								height: 64,
								bgcolor: "green",
							}}
						/>
					</Box>
					<Box>
						<Box sx={{ mb: 1 }}>
							<Typography sx={{ mr: 1 }} component="span">
								<b>Miles Morales</b>
							</Typography>

							<Typography component="span" sx={{ color: "grey" }}>
								@miles
							</Typography>

							<Typography component="span" sx={{ ml: 1, color: "green" }}>
								<small>A few seconds ago</small>
							</Typography>
						</Box>

						<Typography variant="subtitle1" color="text.secondary">
							Lorem, ipsum dolor sit amet consectetur adipisicing
							elit. Incidunt voluptates aut aliquam voluptatum.
							Corrupti reiciendis in cupiditate assumenda quisquam
							deleniti, expedita, ad minima, error veniam cumque
							aperiam perferendis voluptatem modi.
						</Typography>
					</Box>
				</CardContent>
			</CardActionArea>
		</Card>
	);
}
