import React, { useRef } from "react";

import { Button } from "@mui/material";
import KeyboardDoubleArrowUpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";
const ScrollPage = () => {
  const ServicesRef = useRef(null);

  const gotoServices = () =>
    window.scrollTo({
      top: 0,
      behavior: "smooth",
      // You can also assign value "auto"
      // to the behavior parameter.
    });

  return (
    <div>
      <Button
        sx={{
          position: "fixed",
          //   marginTop: "150vh" ,
          left: "94%",
          top: "85%",
          boxShadow: " rgba(149, 157, 165, 0.172) 0px 8px 24px",
          background: "white",
          paddingTop: "15px",
          paddingBottom: "15px",
          color: "black",
          marginBottom: "20px",
          borderRadius: "10px",
        }}
        // variant="contained"
        onClick={gotoServices}
      >
        <KeyboardDoubleArrowUpIcon />
      </Button>
    </div>
  );
};

export default ScrollPage;
