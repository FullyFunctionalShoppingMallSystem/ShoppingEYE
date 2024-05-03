import { ThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import { Box, Typography, useMediaQuery, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import "../assets/css/Ads1.css";
import { Carousel } from 'react-bootstrap';
import gambar1 from '../assets/img/sale2.jpeg';
import gambar2 from '../assets/img/sales4.jpeg';
import gambar3 from '../assets/img/sales5.png';
import gambar4 from '../assets/img/sales6.jpeg';
import gambar5 from '../assets/img/sales7.jpg';
import AnimatedShop from "./animatedshop";

const theme = createTheme();

const Ads1 = () => {
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
    return (
        <ThemeProvider theme={theme}>
            <div style={{ paddingTop: "200px", paddingBottom: "0px", height:'180px'}}>
                <Box py={20}>
                    <Carousel style={{ width: "270px",   }} controls={false}>
                        <Carousel.Item interval={2000}>
                            <img
                                className="d-block w-95"
                                src={gambar1}
                                alt="First slide"
                                style={{ height: "60vh", objectFit: "cover", borderRadius: "10px" }}
                            />
                        </Carousel.Item>
                        <Carousel.Item interval={2000}>
                            <img
                                className="d-block w-95"
                                src={gambar2}
                                alt="Second slide"
                                style={{ height: "60vh", objectFit: "cover", borderRadius: "10px" }}
                            />
                        </Carousel.Item>
                        <Carousel.Item interval={2000}>
                            <img
                                className="d-block w-95"
                                src={gambar3}
                                alt="Third slide"
                                style={{ height: "60vh", objectFit: "cover", borderRadius: "10px" }}
                            />
                        </Carousel.Item>
                        <Carousel.Item interval={2000}>
                            <img
                                className="d-block w-95"
                                src={gambar5}
                                alt="Third slide"
                                style={{ height: "60vh", objectFit: "cover", borderRadius: "10px" }}
                            />
                        </Carousel.Item>
                        <Carousel.Item interval={2000}>
                            <img
                                className="d-block w-95"
                                src={gambar4}
                                alt="Third slide"
                                style={{ height: "60vh", objectFit: "cover", borderRadius: "10px" }}
                            />
                        </Carousel.Item>
                       
                    </Carousel>
                    <AnimatedShop></AnimatedShop>
                    <br />
                  
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

export default Ads1;
