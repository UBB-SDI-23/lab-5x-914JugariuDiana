import { Box, AppBar, Toolbar, IconButton, Typography, Button } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import SchoolIcon from "@mui/icons-material/School";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";

export const AppMenu = () => {
	const location = useLocation();
	const path = location.pathname;

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static" sx={{ marginBottom: "20px" }}>
				<Toolbar>
					<Typography variant="h6" component="div" sx={{ mr: 5 }}>
						Management
					</Typography>
					<Button
						variant={path.startsWith("/ingredients/") ? "outlined" : "text"}
						to="/ingredients"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<LocalLibraryIcon />}>
						Ingredients
					</Button>
					<Button
						variant={path.startsWith("/food/") ? "outlined" : "text"}
						to="/food"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<LocalLibraryIcon />}>
						Foods
					</Button>
					<Button
						variant={path.startsWith("/chef/") ? "outlined" : "text"}
						to="/chef"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<LocalLibraryIcon />}>
						Chefs
					</Button>
					{/*<Button
						variant={path.startsWith("/art/") ? "outlined" : "text"}
						to="/art"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<LocalLibraryIcon />}>
						Arts
					</Button>
					<Button
						variant={path.startsWith("/galleryauthor/") ? "outlined" : "text"}
						to="/galleryauthor"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<LocalLibraryIcon />}>
						Galleries and Authors
					</Button> */}
					<Button
						variant={path.startsWith("/ingredients/ingredientFilter/") ? "outlined" : "text"}
						to="/ingredients/ingredientFilter"
						component={Link}
						color="inherit"
						sx={{ mr: 5 }}
						startIcon={<LocalLibraryIcon />}>
						Ingredients Filter
					</Button>
				</Toolbar>
			</AppBar>
		</Box>
	);
};