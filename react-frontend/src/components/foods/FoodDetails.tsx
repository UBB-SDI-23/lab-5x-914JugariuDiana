import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Food} from "../../models/Food";

export const FoodDetails = () => {
	const { id } = useParams();
	const [food, setFood] = useState<Food>();

	useEffect(() => {
		const fetchCourse = async () => {
			// TODO: use axios instead of fetch
			// TODO: handle errors
			// TODO: handle loading state
			const response = await fetch(`${BACKEND_API_URL}/food/${id}`);
			const food = await response.json();
			setFood(food);
		};
		fetchCourse();
	}, [id]);

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/food/`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<h1>Details</h1>
					<p>Name: {food?.foodName}</p>
					<p>Protein grams: {food?.proteinGrams}</p>
                    <p>Sugar grams: {food?.sugarGrams} </p>
                    <p>Expiration date: {food?.expirationDate}</p>
					<p>Quantity: {food?.quantity}</p>
					{/* <p>Ingredients:</p>
					// <ul>
					// 	{food?.ingredients?.map((Recipe) => (
					// 		<li key={galleryauthor.gallery?.id}>{galleryauthor.author?.name}</li>
					// 	))}
					// </ul> */}
				</CardContent>
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/food/${id}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/food/${id}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
};