import { Button, Card, CardActions, CardContent, Container, FormLabel, IconButton, TextField, colors } from "@mui/material";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import { BACKEND_API_URL } from "../../constants";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useEffect, useState } from "react";
import {Food} from "../../models/Food";


export const FoodEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [food, setFood] = useState<Food>({
        id:0,
        foodName: "",
        proteinGrams: 0,
        sugarGrams: 0,
        expirationDate: "",
        quantity: 0,
    });

    useEffect(() => {
        setLoading(true);
        axios.get(`${BACKEND_API_URL}/food/${id}/`)
            .then((response) => {
                setFood(response.data);
                setLoading(false);
            })
            .catch((error) => console.log(error));
    }, []);


    const updateFood = async (event: { preventDefault: () => void }) => {
        event.preventDefault();
        console.log(food.foodName)
        try {
            await axios.put(`${BACKEND_API_URL}/food/${id}/`, food);
            navigate("/food/");
        } catch (error) {
            console.log(error);
        }
    }

    const handleCancel = (event: { preventDefault: () => void }) => {
        event.preventDefault();
        navigate("/food/");
    };

    return (
        <Container>
            <Card>
                <CardContent>
                    <IconButton component={Link} sx={{ mr: 3 }} to={`/food/`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <form onSubmit={updateFood} style={{ display: "flex", flexDirection: "column", padding: "8px" }}>
                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Name
                            </FormLabel>
                            <TextField
                                id="foodName"
                                label={food.foodName}
                                defaultValue={food.foodName}
                                variant="outlined"
                                onChange={(event) => setFood({ ...food, foodName: event.target.value })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Protein grams
                            </FormLabel>
                            <TextField
                                id="proteinGrams"
                                label={food.proteinGrams}
                                defaultValue={food.proteinGrams}
                                variant="outlined"
                                onChange={(event) => setFood({ ...food, proteinGrams: Number(event.target.value) })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Sugar grams
                            </FormLabel>
                            <TextField
                                id="street"
                                label={food.sugarGrams}
                                defaultValue={food.sugarGrams}
                                variant="outlined"
                                onChange={(event) => setFood({ ...food, sugarGrams: Number(event.target.value) })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Expiration date
                            </FormLabel>
                            <TextField
                                id="Expiration date (yyyy-mm-dd)"
                                label={food.expirationDate}
                                defaultValue={food.expirationDate}
                                variant="outlined"
                                onChange={(event) => setFood({ ...food, expirationDate: event.target.value })}
                            />
                        </Container>

                        <Container sx={{ padding: "3px" }} style={{ display: "flex", flexDirection: "row", justifyContent: "space-around" }}>
                            <FormLabel style={{ marginTop: "15px", fontSize: "18px" }}>
                                Quantity
                            </FormLabel>
                            <TextField
                                id="quantity"
                                label={food.quantity}
                                defaultValue={food.quantity}
                                variant="outlined"
                                onChange={(event) => setFood({ ...food, quantity: Number(event.target.value) })}
                            />
                        </Container>

                    </form>
                </CardContent>
                <CardActions sx={{ justifyContent: "center" }}>
                    <Button type="submit" onClick={updateFood} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Update</Button>
                    <Button onClick={handleCancel} variant="contained" sx={{ backgroundColor: colors.green[500] }}>Cancel</Button>
                </CardActions>
            </Card>
        </Container>
    );
}