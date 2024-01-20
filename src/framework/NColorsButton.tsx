import Button from "@mui/material/Button";
import React from "react";
import { FunctionComponent, useState } from "react";

interface NColorsButtonProps {
    onClick: (Object) => void;
    colors: string[];
    initialColorNumber: number;
}

export const NColorsButton: FunctionComponent<NColorsButtonProps> = ({onClick, colors, initialColorNumber}) => {
    const [colorNumber, setColorNumber] = useState(initialColorNumber);
    const numColors = colors.length;
    return (<Button 
        style= {
          {
            borderRadius: '2px',
            width: '60px',
            border: 'solid 3px black',
            backgroundColor: colors[colorNumber]
          }}
        variant="contained" onClick={(transaction) => {
            setColorNumber((colorNumber  + 1) % numColors)
            onClick(transaction);
          }}>
       </Button>);
}