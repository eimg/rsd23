import { Box, Typography, Avatar } from "@mui/material";
import { Container } from "@mui/material";
import { Link } from "react-router-dom";

export default function About() {
	return (
		<Container>
			<Box sx={{ mx: { lg: 20, md: 10 } }}>
				<Typography variant="h1">About Us</Typography>
				<Typography variant="p">
					Lorem ipsum dolor sit amet consectetur adipisicing elit.
					Consequatur inventore earum repellat debitis magni animi,
					temporibus eligendi reiciendis excepturi cupiditate alias
					accusantium natus est quia pariatur quos, non sequi!
					Similique.
				</Typography>

				<Box sx={{ display: "flex", my: 3 }}>
					<Avatar>A</Avatar>
					<Avatar>B</Avatar>
					<Avatar>C</Avatar>
				</Box>

				<Link to="/">Home</Link>
			</Box>
		</Container>
	);
}
