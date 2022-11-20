import React from "react";
import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";
import StandardImageList from "./imageList";
import AlignItemsList from "./UserList";
import ScrollPage from "./ScrollPage";

export default function Rightbar() {
  return (
    <Box flex={2} p={2} sx={{ display: { xs: "none", sm: "block" } }}>
      <Box position="fixed" width={300}>
        <Box>
          <Typography variant="h6" sx={{ fontWeight: "100" }} mb={2}>
            Latest Blogs
          </Typography>
          <StandardImageList />
          <AlignItemsList />
        </Box>
      </Box>
      {/* <ScrolltoTop/> */}
      <ScrollPage/>
    </Box>
  );
}
