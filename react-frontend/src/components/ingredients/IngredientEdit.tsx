import { Button, Card, CardActions, CardContent, Container, FormLabel, IconButton, TextField, colors, Checkbox } from "@mui/material";
import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import {Ingredient} from "../../models/Ingredient";
import { useEffect, useState } from "react";


export const IngredientEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [ingredient, setIngredient] = useState<Ingredient>({
        id:0,
        ingredientName: "",
        location: "",
        runningLow: false,
        expirationDate: "",
        quantity: 0
    });

    useEffect(() => {
        setLoading(true);
        axios.get(`${BACKEND_API_URL}/ingredient/${id}/`)
            .then((response) => {
                setIngredient(response.data);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);

    const updateIngredient = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        try {
            await axios.put(`${BACKEND_API_URL}/ingredients/${id}/`, ingredient);
            navigate("/ingredients/");
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancel = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        navigate("/ingredients/");
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/ingredients/`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <form onSubmit={updateIngredient} style={{ display: "flex", flexDirection: "column", padding: "8px" }}>
                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Name
                            </FormLabel>
                            <TextField
                                id="ingredientName"
                                label={ingredient.ingredientName}
                                defaultValue={ingredient.ingredientName}
                                variant="outlined"
                                onChange={(event) => setIngredient({ ...ingredient, ingredientName: event.target.value })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Location
                            </FormLabel>
                            <TextField
                                id="city"
                                label={ingredient.location}
                                defaultValue={ingredient.location}
                                variant="outlined"
                                onChange={(event) => setIngredient({ ...ingredient, location: event.target.value })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Running Low
                            </FormLabel>
                            <Checkbox
                                id="runningLow"
                                defaultChecked={ingredient.runningLow}
                                onChange={(event) => setIngredient({ ...ingredient, runningLow: Boolean(event.target.value) })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Expiration date
                            </FormLabel>
                            <TextField
                                id="expirationDate"
                                label={ingredient.expirationDate}
                                defaultValue={ingredient.expirationDate}
                                variant="outlined"
                                onChange={(event) => setIngredient({ ...ingredient, expirationDate: event.target.value })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Quantity
                            </FormLabel>
                            <TextField
                                id="quantity"
                                label={ingredient.quantity}
                                defaultValue={ingredient.quantity}
                                variant="outlined"
                                onChange={(event) => setIngredient({ ...ingredient, quantity: Number(event.target.value) })}
                            />
                        </Container>

                    </form>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                    <Button type="submit" onClick={updateIngredient} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Update</Button>
                    <Button onClick={handleCancel} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Cancel</Button>
                </CardActions>
            </Card>
        </Container>
    );
}