import { useState, useEffect } from "react";
import { Box, IconButton } from "@mui/material";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";
import Slider, { CustomArrowProps, Settings } from "react-slick";
import { FetchError, MarqueTypes } from "../../../types";
import ApiService from "../../../utils/ApiService";

interface ArrowProps extends CustomArrowProps {
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

const MarqueSection = () => {
  function PrevArrow(props: ArrowProps) {
    const { onClick } = props;
    return (
      <Box
        style={{
          display: "flex",
          position: "absolute",
          left: 5,
          top: 0,
          bottom: 0,
          zIndex: 99,
          alignItems: "center",
        }}
      >
        <Box sx={{ backgroundColor: "#ddd", borderRadius: "50%" }}>
          <IconButton onClick={onClick} href="#">
            <MdOutlineKeyboardArrowLeft />
          </IconButton>
        </Box>
      </Box>
    );
  }

  function NextArrow(props: ArrowProps) {
    const { onClick } = props;
    return (
      <Box
        style={{
          display: "flex",
          position: "absolute",
          right: 5,
          top: 0,
          bottom: 0,
          zIndex: 99,
          alignItems: "center",
        }}
      >
        <Box sx={{ backgroundColor: "#ddd", borderRadius: "50%" }}>
          <IconButton onClick={onClick} href="#">
            <MdOutlineKeyboardArrowRight />
          </IconButton>
        </Box>
      </Box>
    );
  }
  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 5,
    slidesToScroll: 1,
    prevArrow: <PrevArrow />, // Display previous arrow
    nextArrow: <NextArrow />, // Display next arrow
    className: "xslider",
  };

  const [marques, setMarques] = useState<MarqueTypes[]>([]);

  useEffect(() => {
    ApiService.listMarque()
      .then((res) => res.json())
      .then((data: MarqueTypes[]) => {
        setMarques(data);
      })
      .catch((err: FetchError) => console.log(err.message));
  }, []);

  return (
    <Box
      sx={{
        marginLeft: 2,
        marginRight: 2,
        height: "100%",
        
      }}
    >
      <Slider {...settings}>
        {marques?.map((marque) => (
          <div
            key={marque.id}
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              justifyContent: "center",
              padding: "10px",
              cursor:"pointer"
            }}
          >
            <img
              src={marque.logo}
              alt={marque.nom}
              style={{ width: "100%", height: "100px", objectFit: "contain" }}
            />
            <center>
              <h3>{marque.nom}</h3>
            </center>
          </div>
        ))}
      </Slider>
    </Box>
  );
};

export default MarqueSection;
