import {useEffect, useState} from "react";
import {Food} from "../../models/Food";
import {BACKEND_API_URL} from "../../constants";
import {
    TableContainer,
    Paper,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    IconButton,
    Tooltip,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const FoodShowAll = () => {
    const [loading, setLoading] = useState(false);
    const [foods, setFood] = useState<Food[]>([]);

    useEffect(() => {
        fetch(`${BACKEND_API_URL}/food/`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setFood(data);
            });
    }, []);

    if (foods.length == 0) {
        return <div>No foods</div>;
    }

    return (
        <div>
            <h1>Foods List</h1>
            {!loading && foods.length === 0 && <p>No foods found</p>}
            {!loading && (
                <IconButton
                    sx={{mr: 3}}
                    onClick={() => {
                        window.location.href = '/food/add/';
                    }}
                >
                    <Tooltip title="Add a new food" arrow>
                        <AddIcon color="primary"/>
                    </Tooltip>
                </IconButton>
            )}
            {!loading && foods.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">

                        <TableHead>
                            <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Name</TableCell>
                                <TableCell align="center">Protein grams</TableCell>
                                <TableCell align="center">Sugar grams</TableCell>
                                <TableCell align="center">Expiration date</TableCell>
                                <TableCell align="center">Quantity</TableCell>
                                <TableCell align="center">Operations</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {foods.map((food: Food, index) => (
                                <tr key={index}>
                                    <TableCell align="center">{index}</TableCell>
                                    <TableCell align="center">{food.foodName}</TableCell>
                                    <TableCell align="center">{food.proteinGrams}</TableCell>
                                    <TableCell align="center">{food.sugarGrams}</TableCell>
                                    <TableCell align="center">{food.expirationDate}</TableCell>
                                    <TableCell align="center">{food.quantity.toString()}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            sx={{mr: 3}}
                                            onClick={() => {
                                                window.location.href = `/food/${food.id}/details`;
                                            }}
                                        >
                                            <Tooltip title="View food details" arrow>
                                                <ReadMoreIcon color="primary"/>
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton
                                            sx={{mr: 3}}
                                            onClick={() => {
                                                window.location.href = `/food/${food.id}/edit`;
                                            }}
                                        >
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton
                                            sx={{mr: 3}}
                                            onClick={() => {
                                                window.location.href = `/food/${food.id}/delete`;
                                            }}
                                        >
                                            <DeleteForeverIcon sx={{color: "red"}} />
                                        </IconButton>
                                    </TableCell>
                                </tr>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </div>
    );
};