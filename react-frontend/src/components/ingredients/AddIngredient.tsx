import {useState} from "react";
import {Ingredient} from "../../models/Ingredient";
import {BACKEND_API_URL} from "../../constants";
import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';
import { Button, Card, CardActions, CardContent, IconButton, TextField, Checkbox } from "@mui/material";
import DatePicker from "react-datepicker";
import { Container } from "@mui/system";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";


export const AddIngredient = () =>{
    const navigate = useNavigate();
    const [startDate, setStartDate] = useState(new Date());
    const handleCalendarClose = () => console.log("Calendar closed");
    const handleCalendarOpen = () => console.log("Calendar opened");

    const [ingredient, setIngredient] = useState<Ingredient>({
        id:0,
        ingredientName: "",
        location: "",
        runningLow: false,
        expirationDate: "",
        quantity: 0
    });

    const addIngredient = async (event: {preventDefault: () => void}) =>{
        event.preventDefault();
        console.log(ingredient)
        try{
            await axios.post(`${BACKEND_API_URL}/ingredients/`, ingredient);
            navigate("/ingredients");
        }catch (error){
            console.log(error);
        }
    };

    return(
        <Container>
            <Card>
                <CardContent>
                    <IconButton component = {Link} sx={{ mr: 3}} to ={`/ingredients/`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <form onSubmit={addIngredient}>
						<TextField
							id="ingredientName"
							label="Ingredient Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setIngredient({ ...ingredient, ingredientName: event.target.value })}
						/>
						<TextField
							id="location"
							label="City"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setIngredient({ ...ingredient, location: event.target.value })}
						/>
                        <label>Running low          </label>
                        <Checkbox
							id="runningLow"
                            value = "running low"
							sx={{ mb: 2 }}
							onChange={(event) => setIngredient({ ...ingredient, runningLow: Boolean(event.target.value) })}
						/>
                        <TextField
							id="expirationDate"
							label="Expiration Date yyyy-mm-dd"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setIngredient({ ...ingredient, expirationDate: event.target.value})}
						/>
                        <TextField
							id="quantity"
							label="Quantity"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setIngredient({ ...ingredient, quantity: Number(event.target.value) })}
						/>

						<Button type="submit">Add ingredient</Button>
					</form>
                </CardContent>
            </Card>
        </Container>
    )


}