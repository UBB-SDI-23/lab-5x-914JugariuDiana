import {useState} from "react";
import {BACKEND_API_URL} from "../../constants";
import axios, { AxiosRequestConfig, AxiosPromise, AxiosResponse } from 'axios';
import { Button, Card, CardActions, CardContent, IconButton, TextField, Checkbox } from "@mui/material";
import DatePicker from "react-datepicker";
import { Container } from "@mui/system";
import { Link, useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Chef } from "../../models/Chef";

export const AddChef = () =>{
    const navigate = useNavigate();

    const [chef, setChef] = useState<Chef>({
        id:0,
        firstName: "",
        lastName: "",
        prizes: 0,
        dob: "",
        cnp: "",
    });

    const addChef = async (event: {preventDefault: () => void}) =>{
        event.preventDefault();
        console.log(chef)
        try{
            await axios.post(`${BACKEND_API_URL}/chef/`, chef);
            navigate("/chef");
        }catch (error){
            console.log(error);
        }
    };

    return(
        <Container>
            <Card>
                <CardContent>
                    <IconButton component = {Link} sx={{ mr: 3}} to ={`/chef/`}>
                        <ArrowBackIcon />
                    </IconButton>{" "}
                    <form onSubmit={addChef}>
						<TextField
							id="firstName"
							label="First Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setChef({ ...chef, firstName: event.target.value })}
						/>
						<TextField
							id="lastName"
							label="Last Name"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setChef({ ...chef, lastName: event.target.value })}
						/>
                        <TextField
							id="prizes"
							label="Prizes"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setChef({ ...chef, prizes: Number(event.target.value) })}
						/>
                        <TextField
							id="dob"
							label="Date of bird (yyyy-mm-dd)"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setChef({ ...chef, dob: event.target.value})}
						/>
                        <TextField
							id="cnp"
							label="CNP"
							variant="outlined"
							fullWidth
							sx={{ mb: 2 }}
							onChange={(event) => setChef({ ...chef, cnp: event.target.value})}
						/>
						<Button type="submit">Add chef</Button>
					</form>
                </CardContent>
            </Card>
        </Container>
    )


}