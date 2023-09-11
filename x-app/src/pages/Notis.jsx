import { useState, useEffect, useContext } from "react";

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
import { fetchNotis, fetchReadNoti, fetchReadNotis } from "../libs/fetcher";
import { NotiContext } from "../ThemedApp";

export default function Notis() {
	const navigate = useNavigate();

	const { setNotiCount } = useContext(NotiContext);

	const [isLoading, setIsLoading] = useState(false);
	const [notis, setNotis] = useState([]);

	useEffect(() => {
		setIsLoading(true);

		(async () => {
			const result = await fetchNotis();
			setNotis(result);
			setNotiCount(result.filter(noti => !noti.read).length);
			setIsLoading(false);
		})();
	}, []);

	const readNoti = _id => {
		fetchReadNoti(_id);

		setNotis(
			notis.map(noti => {
				if (noti._id === _id) noti.read = true;
				return noti;
			}),
		);

		setNotiCount(notis.filter(noti => !noti.read).length);
	};

	return (
		<Box>
			<Box sx={{ display: "flex", mb: 2 }}>
				<Box sx={{ flex: 1 }}></Box>
				<Button
					size="small"
					variant="outlined"
					sx={{ borderRadius: 5 }}
					onClick={() => {
						setNotis(
							notis.map(noti => {
								noti.read = true;
								return noti;
							}),
						);

						fetchReadNotis();
						setNotiCount(0);
					}}>
					Mark all as read
				</Button>
			</Box>

			{!isLoading &&
				notis.map(noti => {
					return (
						<Card key={noti._id}>
							<CardActionArea
								onClick={() => {
									readNoti(noti._id);
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
