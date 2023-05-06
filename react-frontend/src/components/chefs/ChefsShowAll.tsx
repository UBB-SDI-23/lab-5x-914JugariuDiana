import {useEffect, useState} from "react";
import {Chef} from "../../models/Chef";
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


export const ChefShowAll = () => {
    const [loading, setLoading] = useState(false);
    const [chefs, setChef] = useState<Chef[]>([]);

    useEffect(() => {
        fetch(`${BACKEND_API_URL}/chef/`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setChef(data);
            });
    }, []);

    if (chefs.length == 0) {
        return <div>No chefs</div>;
    }

    return (
        <div>
            <h1>Chefs List</h1>
            {!loading && chefs.length === 0 && <p>No chefs found</p>}
            {!loading && (
                <IconButton
                    sx={{mr: 3}}
                    onClick={() => {
                        window.location.href = '/chef/add/';
                    }}
                >
                    <Tooltip title="Add a new chef" arrow>
                        <AddIcon color="primary"/>
                    </Tooltip>
                </IconButton>
            )}
            {!loading && chefs.length > 0 && (
                <TableContainer component={Paper}>
                    <Table sx={{minWidth: 650}} aria-label="simple table">

                        <TableHead>
                            <TableRow>
                                <TableCell align="center">ID</TableCell>
                                <TableCell align="center">First Name</TableCell>
                                <TableCell align="center">Last Name</TableCell>
                                <TableCell align="center">Prizes</TableCell>
                                <TableCell align="center">Date of bird</TableCell>
                                <TableCell align="center">CNP</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {chefs.map((chef: Chef, index) => (
                                <tr key={index}>
                                    <TableCell align="center">{index}</TableCell>
                                    <TableCell align="center">{chef.firstName}</TableCell>
                                    <TableCell align="center">{chef.lastName}</TableCell>
                                    <TableCell align="center">{chef.prizes}</TableCell>
                                    <TableCell align="center">{chef.dob}</TableCell>
                                    <TableCell align="center">{chef.cnp}</TableCell>
                                    <TableCell align="right">
                                        <IconButton
                                            sx={{mr: 3}}
                                            onClick={() => {
                                                window.location.href = `/chef/${chef.id}/details`;
                                            }}
                                        >
                                            <Tooltip title="View chef details" arrow>
                                                <ReadMoreIcon color="primary"/>
                                            </Tooltip>
                                        </IconButton>

                                        <IconButton
                                            sx={{mr: 3}}
                                            onClick={() => {
                                                window.location.href = `/chef/${chef.id}/edit`;
                                            }}
                                        >
                                            <EditIcon/>
                                        </IconButton>

                                        <IconButton
                                            sx={{mr: 3}}
                                            onClick={() => {
                                                window.location.href = `/chef/${chef.id}/delete`;
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

