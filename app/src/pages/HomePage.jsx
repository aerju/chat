import { Box } from "@mui/material";
import NavBar from "../components/NavBar";
import StartChat from "../components/StartChat";

const HomePage = () => {
  
  return (
    <div>
      {/* <NavBar /> */}
      <Box
        // display="flex"
        // alignItems="center"
        // justifyContent="center"
        minHeight="90vh"
      >
        <NavBar/>
        <StartChat />
      </Box>
    </div>
  );
};

export default HomePage;
