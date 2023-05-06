import {useCallback, useEffect, useState} from "react";
import {Food} from "../../models/Food";
import {Chef} from "../../models/Chef";
import {BACKEND_API_URL} from "../../constants";
import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';
import { Autocomplete, Button, Card, CardActions, CardContent, IconButton, TextField, Checkbox } from "@mui/material";
import { Container } from "@mui/system";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { number } from "prop-types";
import {debounce} from "lodash";

// id: number;
//     foodName: string;
//     proteinGrams: number;
//     sugarGrams: number;
//     expirationDate: Date;
//     quantity: number;
//     chefCreator: Chef;
export const AddFood = () =>{
    const navigate = useNavigate();

    const [food, setFood] = useState<Food>({
        id:0,
        foodName: "",
        proteinGrams: 0,
        sugarGrams: 0,
        expirationDate: "",
        quantity: 0,
        chefCreator:0,
    });

    const [chefs, setChef] = useState<Chef[]>([]);
    const [lastGetChefsCall, setLastGetChefsCall] = useState<number>(0);


    const fetchSuggestions = async (query: string) => {
        try {
            const currentLastGetAuthorsCall = lastGetChefsCall;
            setLastGetChefsCall((prev) => prev + 1);
            console.log("giees");
            console.log(query);
            console.log(food);
            const response = await axios.get(
                `${BACKEND_API_URL}/chef/autocomplete/?query=${query}`
            );
            const data = await response.data;

            if (currentLastGetAuthorsCall === lastGetChefsCall) setChef(data);
        } catch (error) {
            console.log(error);
        }
    };

    const debouncedFetchSuggestions = useCallback(debounce(fetchSuggestions, 5), []);

    useEffect(() => {
        return () => {
            debouncedFetchSuggestions.cancel();
        };
    }, [debouncedFetchSuggestions]);

    const handleInputChange = (event: any, value: any, reason: any) => {
        console.log("input", value, reason);

        if (reason === "input") {
            debouncedFetchSuggestions(value);
        }
    };

    const addFood = async (event: {preventDefault: () => void}) =>{
        event.preventDefault();
        console.log(food)
        try{
            await axios.post(`${BACKEND_API_URL}/food/`, food);
            navigate("/food");
        }catch (error){
            console.log(error);
        }
    };

    return(
        <Container>
            <Card>
                <CardContent>
                    <IconButton component = {Link} sx={{ mr: 3}} to ={`/food/`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <form onSubmit={addFood}>
						<TextField
							id="foodName"
							label="Food Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setFood({ ...food, foodName: event.target.value })}
						/>
						<TextField
							id="proteinGrams"
							label="Protein grams"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setFood({ ...food, proteinGrams: Number(event.target.value) })}
						/>
                        <TextField
							id="sugarGrams"
							label="Sugar Grams"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setFood({ ...food, sugarGrams: Number(event.target.value) })}
						/>
                        <TextField
							id="expirationDate"
							label="Expiration Date yyyy-mm-dd"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setFood({ ...food, expirationDate: event.target.value})}
						/>
                        <TextField
							id="quantity"
							label="Quantity"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setFood({ ...food, quantity: Number(event.target.value) })}
						/>

                        <Autocomplete
                            disableClearable={true}
                            options={chefs}
                            filterOptions={(x) => x}
                            getOptionLabel={(option) =>
                                option.firstName + " " + option.lastName
                            }
                            onInputChange={(e, value) => debouncedFetchSuggestions(value)}
                            renderInput={(params) => (
                                <TextField {...params} label="Chef" variant="outlined"/>
                            )}
                            onChange={(e, value) => {
                                if (value) {
                                    console.log(value);
                                    setFood({...food, chefCreator: value.id });
                                }
                            }}
                            disablePortal
                            className="autocomplete-blend"
                        />

						<Button type="submit">Add food</Button>
					</form>
                </CardContent>
            </Card>
        </Container>
    )


}