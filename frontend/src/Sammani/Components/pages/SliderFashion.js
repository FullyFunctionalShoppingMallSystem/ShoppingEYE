import { ThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import { Box, Typography, useMediaQuery, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Carousel } from 'react-bootstrap';
import gambar1 from '../assets/img/Shopping5.jpg';
import gambar2 from '../assets/img/Shopping2.jpg';
import gambar3 from '../assets/img/Shopping3.jpg';
import Animation1 from "./TextAmination1";



const theme = createTheme();


const Slider = () => {
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  return (
    <ThemeProvider theme={theme}>
    <div style={{ paddingTop:" 0px" , paddingBottom:" 0px"}}>
      <Box py={20}>
     < Carousel indicators={false}>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src={gambar1}
            alt="First slide"
            style={{ height: "60vh", objectFit: "cover" }}
          />
          <Animation1></Animation1>
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100"
            src={gambar2}
            alt="Second slide"
            style={{ height: "60vh", objectFit: "cover" }}
          />
        </Carousel.Item>
        <Carousel.Item interval={2000}>
          <img
            className="d-block w-100 "
            src={gambar3}
            alt="Third slide"
            style={{ height: "60vh", objectFit: "cover" }}
          />
        </Carousel.Item>

     
      </Carousel>
      <br/>
   
      </Box>
      {isMobile ? (
        <Box textAlign="right">
         
        </Box>
      ) : (
        <> </>
      )}
    </div>
</ThemeProvider>
  );
};
export default Slider;
