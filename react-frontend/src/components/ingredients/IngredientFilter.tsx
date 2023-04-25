import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    CircularProgress,
    Container,
    Button,
} from "@mui/material";
import {useEffect, useState} from "react";
import {BACKEND_API_URL} from "../../constants";
import {Ingredient} from "../../models/Ingredient";


export const IngredientFilter = () => {
    const [loading, setLoading] = useState(true)
    const [ingredient, setIngredient] = useState([]);

    useEffect(() => {
        fetch(`${BACKEND_API_URL}/ingredients/ingredientFilter/?quantity=500`)
            .then(res => res.json())
            .then(data => {
                setIngredient(data);
                setLoading(false);
            })
    }, []);

    console.log(ingredient);

    const sortIngredient = () => {
        const sortedPlayers = [...ingredient].sort((a: Ingredient, b: Ingredient) => {
            if (a.quantity < b.quantity) {
                return -1;
            }
            if (a.quantity > b.quantity) {
                return 1;
            }
            return 0;

        })
        console.log(sortedPlayers);
        setIngredient(sortedPlayers);
    }


    return (
        <Container>

            <h1 style={{marginTop: "65px"}}>All ingredients filtered by quantity</h1>

            {loading && <CircularProgress/>}

            {!loading && ingredient.length == 0 && <div>No ingredients found</div>}
            {!loading && (
                <Button sx={{color: "white"}} onClick={sortIngredient}>
                    Sort ingredient by quantity
                </Button>
            )}

            {!loading && ingredient.length > 0 && (

                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 800}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>#</TableCell>
                                <TableCell align="center"
                                           style={{color: "#2471A3", fontWeight: 'bold'}}>Name</TableCell>
                                <TableCell align="center"
                                           style={{color: "#2471A3", fontWeight: 'bold'}}>Expiration date</TableCell>
                                <TableCell align="center"
                                           style={{color: "#2471A3", fontWeight: 'bold'}}>Quantity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ingredient.map((ingredients: Ingredient, index) => (
                                <TableRow key={ingredients.id}>
                                    <TableCell component="th" scope="row">
                                        {index + 1}
                                    </TableCell>
                                    <TableCell align="center">{ingredients.ingredientName}</TableCell>
                                    <TableCell align="center">{ingredients.expirationDate}</TableCell>
                                    <TableCell align="center">{ingredients.quantity}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )
            }
        </Container>

    );
};