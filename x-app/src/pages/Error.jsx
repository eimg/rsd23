import { Box, Typography } from "@mui/material"
import { Link } from "react-router-dom"

export default function Error() {
	return <Box>
		<Typography variant="h1">Error</Typography>
		<Typography variant="body" component="p" sx={{ mb: 4 }}>Something went wrong!</Typography>
		<Link to="/">Go Home</Link>
	</Box>
}
