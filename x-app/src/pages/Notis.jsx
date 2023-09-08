import { useState, useEffect } from "react";

import {
	Box,
	Card,
	Avatar,
	Button,
	Typography,
	CardContent,
	CardActionArea,
} from "@mui/material";

import {
	Comment as CommentIcon,
	Favorite as FavoriteIcon,
} from "@mui/icons-material";

import { useNavigate } from "react-router-dom";
import { formatRelative, parseISO } from "date-fns";

export default function Notis() {
	const navigate = useNavigate();

	const [notis, setNotis] = useState([]);

	useEffect(() => {
		(async () => {
			//
		})();
	}, []);

	return (
		<Box>
			<Box sx={{ display: "flex", mb: 2 }}>
				<Box sx={{ flex: 1 }}></Box>
				<Button
					size="small"
					variant="outlined"
					sx={{ borderRadius: 5 }}
					onClick={() => {
						//
					}}>
					Mark all as read
				</Button>
			</Box>

			{notis.map(noti => {
				return (
					<Card key={noti._id}>
						<CardActionArea
							onClick={() => {
								navigate(`/comments/${noti.target}`);
							}}>
							<CardContent
								sx={{
									display: "flex",
									opacity: noti.read ? 0.4 : 1,
								}}>
								{noti.type === "comment" ? (
									<CommentIcon color="success" />
								) : (
									<FavoriteIcon color="error" />
								)}

								<Box sx={{ ml: 3 }}>
									<Avatar alt="Profile"></Avatar>

									<Box sx={{ mt: 1 }}>
										<Typography
											component="span"
											sx={{ mr: 1 }}>
											<b>{noti.user.name}</b>
										</Typography>

										<Typography
											component="span"
											sx={{
												mr: 1,
												color: "text.secondary",
											}}>
											{noti.msg}
										</Typography>

										<Typography
											component="span"
											color="primary">
											<small>
												{formatRelative(
													parseISO(noti.created),
													new Date(),
												)}
											</small>
										</Typography>
									</Box>
								</Box>
							</CardContent>
						</CardActionArea>
					</Card>
				);
			})}
		</Box>
	);
}
