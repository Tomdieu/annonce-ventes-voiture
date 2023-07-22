import { CustomArrowProps } from "react-slick";
import { Box, IconButton } from "@mui/material";
import {
  MdOutlineKeyboardArrowRight,
  MdOutlineKeyboardArrowLeft,
} from "react-icons/md";

interface ArrowProps extends CustomArrowProps {
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

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

export { PrevArrow, NextArrow };
