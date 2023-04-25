import { useEffect, useState } from "react";
import { Ingredient } from "../../models/Ingredient";
import {BACKEND_API_URL} from "../../constants";
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
  IconButton,
  Tooltip,
  Toolbar,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {Link} from "react-router-dom";
import ReadMoreIcon from "@mui/icons-material/ReadMore";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export const IngredientShowAll = () => {
  
  const [loading, setLoading] = useState(false);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    fetch(`${BACKEND_API_URL}/ingredients/`)
      .then((res) => res.json())
      .then((data) => { console.log(data);
        setIngredients(data);});
      }, []);

    if (ingredients.length == 0){
      return <div> No ingredients </div>;
    }
  
    return (
      <div className="App">
        <h1>Ingredient List</h1>
        {!loading && ingredients.length === 0 && <p>No ingredients found</p>}
            {!loading && (
                <IconButton
                    sx={{mr: 3}}
                    onClick={() => {
                        window.location.href = '/ingredients/add/';
                    }}
                >
                    <Tooltip title="Add a new ingredient" arrow>
                        <AddIcon color="primary"/>
                    </Tooltip>
                </IconButton>
            )}
            {!loading && ingredients.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">Ingredient name</TableCell>
                                <TableCell align="center">Location</TableCell>
                                <TableCell align="center">Running Low </TableCell>
                                <TableCell align="center">Expiration date </TableCell>
                                <TableCell align="center">Quantity</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {ingredients.map((ingredient: Ingredient, index) =>  (
                                <TableRow key={index}>
                                    <TableCell align="center">{index}</TableCell>
                                    <TableCell align="center">{ingredient.ingredientName}</TableCell>
                                    <TableCell align="center">{ingredient.location}</TableCell>
                                    <TableCell align="center">{ingredient.runningLow ? 'yes' : 'no '}</TableCell>
                                    <TableCell align="center">{ingredient.expirationDate.toString()}</TableCell> 
                                    <TableCell align="center">{ingredient.quantity}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            sx={{mr: 3}}
                                            onClick={() => {
                                                window.location.href = `/ingredients/${ingredient.id}/details`;
                                            }}
                                        >
                                            <Tooltip title="View ingredient details" arrow>
                                                <ReadMoreIcon color="primary"/>
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton
                                            sx={{mr: 3}}
                                            onClick={() => {
                                                window.location.href = `/ingredients/${ingredient.id}/edit`;
                                            }}
                                        >
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton
                                            sx={{mr: 3}}
                                            onClick={() => {
                                                window.location.href = `/ingredients/${ingredient.id}/delete`;
                                            }}
                                        >
                                            <DeleteForeverIcon sx={{color: "red"}} />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            )   )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
      </div>
    )
  };
  
  // <table>
  //         <tr>
  //           <th> # </th>
  //           <th> Ingredient name </th>
  //           <th> Location </th>
  //           <th> Running Low </th>
  //           <th> Expiration date </th>
  //           <th> Quantity </th>
  //         </tr>
  //         {ingredients.map((ingredient: Ingredient, index) => {
  //           return(
  //           <tr key={index}>
  //             <td>{index}</td>
  //             <td>{ingredient.ingredientName}</td>
  //             <td>{ingredient.location} </td>
  //             <td>{ingredient.runningLow} </td>
  //             <td>{ingredient.quantity}</td>
  //           </tr>
  //           );
  //         })}
  //       </table>