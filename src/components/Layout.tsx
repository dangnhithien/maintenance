import { Box } from "@mui/material";
import React, { PropsWithChildren } from "react";
import TheMenu from "./TheMenu";

const TheLayout: React.FC<PropsWithChildren> = ({ children }) => {
    
  return <div>
    <TheMenu />
    <Box sx={{p:2}}>

    {children}
    </Box>
    </div>;
};

export default TheLayout;
