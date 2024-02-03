import Button from '@mui/material/Button';
import React from 'react';
import { FunctionComponent, useState } from 'react';

interface NColorsButtonProps {
  onClick: (Object) => Promise<boolean>;
  colors: string[];
  initialColorNumber: number;
  data: Object;
}

export const NColorsButton: FunctionComponent<NColorsButtonProps> = ({ onClick, colors, initialColorNumber, data }) => {
  const [colorNumber, setColorNumber] = useState(initialColorNumber);
  const numColors = colors.length;
  return (
    <Button
      style={{
        borderRadius: '2px',
        width: '60px',
        border: 'solid 3px black',
        backgroundColor: colors[colorNumber],
      }}
      variant='contained'
      onClick={() => {
        onClick(data).then((success) => {
          if (success) {
            setColorNumber((colorNumber + 1) % numColors);
          }
        });
      }}
    ></Button>
  );
};
