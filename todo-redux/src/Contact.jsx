import { Box, Typography, Avatar } from "@mui/material";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";

export default function Contact() {
	return (
		<Container>
			<Box sx={{ mx: { lg: 20, md: 10 } }}>
				<Typography variant="h1">Contact Us</Typography>

				<Box sx={{ display: "flex", my: 3 }}>
					<Avatar
						sx={{
							width: 128,
							height: 128,
							mr: 2,
							bgcolor: "teal",
						}}>
						A
					</Avatar>
					<Avatar
						sx={{
							width: 128,
							height: 128,
							mr: 2,
							bgcolor: "purple",
						}}>
						B
					</Avatar>
					<Avatar sx={{ width: 128, height: 128, bgcolor: "brown" }}>
						C
					</Avatar>
				</Box>

				<Typography variant="p" component="p" sx={{ mb: 2 }}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Consequatur inventore earum repellat debitis magni animi,
					temporibus eligendi reiciendis excepturi cupiditate alias
					accusantium natus est quia pariatur quos, non sequi!
					Similique.
				</Typography>

				<Typography variant="p" component="p" sx={{ mb: 4 }}>
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Consequatur inventore earum repellat debitis magni animi,
					temporibus eligendi reiciendis excepturi cupiditate alias
					accusantium natus est quia pariatur quos, non sequi!
					Similique.
				</Typography>

				<Link to="/">Home</Link>
			</Box>
		</Container>
	);
}
