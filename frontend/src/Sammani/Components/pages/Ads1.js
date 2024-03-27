import { ThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import { Box, Typography, useMediaQuery, Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import "../assets/css/Ads1.css";
import { Carousel } from 'react-bootstrap';
import gambar1 from '../assets/img/Shopping5.jpg';
import gambar2 from '../assets/img/Shopping2.jpg';
import gambar3 from '../assets/img/Shopping3.jpg';

const theme = createTheme();

const Ads1 = () => {
    const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  
    return (
        <ThemeProvider theme={theme}>
            <div style={{ paddingTop: "0px", paddingBottom: "0px", position: "relative", paddingLeft: "15px", height:'180px'}}>
                <Box py={20}>
                    <Carousel style={{ width: "350px",   }} controls={false}>
                        <Carousel.Item interval={1300}>
                            <img
                                className="d-block w-95"
                                src={gambar1}
                                alt="First slide"
                                style={{ height: "60vh", objectFit: "cover", borderRadius: "10px" }}
                            />
                        </Carousel.Item>
                        <Carousel.Item interval={1300}>
                            <img
                                className="d-block w-95"
                                src={gambar2}
                                alt="Second slide"
                                style={{ height: "60vh", objectFit: "cover", borderRadius: "10px" }}
                            />
                        </Carousel.Item>
                        <Carousel.Item interval={1300}>
                            <img
                                className="d-block w-95"
                                src={gambar3}
                                alt="Third slide"
                                style={{ height: "60vh", objectFit: "cover", borderRadius: "10px" }}
                            />
                        </Carousel.Item>
                        <Carousel.Item interval={1300}>
                            <img
                                className="d-block w-95"
                                src={gambar3}
                                alt="Third slide"
                                style={{ height: "60vh", objectFit: "cover", borderRadius: "10px" }}
                            />
                        </Carousel.Item>
                        <Carousel.Item interval={1300}>
                            <img
                                className="d-block w-95"
                                src={gambar3}
                                alt="Third slide"
                                style={{ height: "60vh", objectFit: "cover", borderRadius: "10px" }}
                            />
                        </Carousel.Item>
                    </Carousel>
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
