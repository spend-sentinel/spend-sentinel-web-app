import Button from '@mui/material/Button';
import React from 'react';
import { FunctionComponent, useState } from 'react';
import { MoneyTransaction } from '../../../transaction-api/src/shared/types';

interface Props {
  onClick: (data: MoneyTransaction) => Promise<boolean>;
  colors: string[];
  initialColorNumber: number;
  data: MoneyTransaction;
}

export const NColorsButton: FunctionComponent<Props> = ({ onClick, colors, initialColorNumber, data }) => {
  const [colorNumber, setColorNumber] = useState(initialColorNumber);
  const numColors = colors.length;
  const buttonStyle = {
    borderRadius: '2px',
    width: '60px',
    border: 'solid 3px black',
    backgroundColor: colors[colorNumber],
  };
  return (
    <Button
      style={buttonStyle}
      variant='contained'
      onClick={() => {
        onClick(data).then((success) => {
          if (success) {
            setColorNumber((colorNumber + 1) % numColors);
          } else {
            alert('Something went wrong upon updating transaction');
          }
        });
      }}
    ></Button>
  );
};
