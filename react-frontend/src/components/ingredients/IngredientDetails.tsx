import { Card, CardActions, CardContent, IconButton } from "@mui/material";
import { Container } from "@mui/system";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import {Ingredient} from "../../models/Ingredient";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Food } from "../../models/Food";
import { Recipe } from "../../models/Recipe";

export const IngredientDetails = () => {
	const { id } = useParams();
	const [ingredient, setCourse] = useState<Ingredient>();

	useEffect(() => {
		const fetchCourse = async () => {
			// TODO: use axios instead of fetch
			// TODO: handle errors
			// TODO: handle loading state
			const response = await fetch(`${BACKEND_API_URL}/ingredients/${id}/`);
			const ingredient = await response.json();
			setCourse(ingredient);
		};
		fetchCourse();
	}, [id]);

	return (
		<Container>
			<Card>
				<CardContent>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/ingredients/`}>
						<ArrowBackIcon />
					</IconButton>{" "}
					<h1>Ingredient Details</h1>
					<p>Ingredient name: {ingredient?.ingredientName}</p>
					<p>Ingredient quantity: {ingredient?.quantity}</p>
					<p>Running low: {ingredient?.runningLow ? "yes" : "no" }</p>
                    <p>Expiration date: {ingredient?.expirationDate}</p>
					
				</CardContent>
				<CardActions>
					<IconButton component={Link} sx={{ mr: 3 }} to={`/ingredients/${id}/edit`}>
						<EditIcon />
					</IconButton>

					<IconButton component={Link} sx={{ mr: 3 }} to={`/ingredients/${id}/delete`}>
						<DeleteForeverIcon sx={{ color: "red" }} />
					</IconButton>
				</CardActions>
			</Card>
		</Container>
	);
};