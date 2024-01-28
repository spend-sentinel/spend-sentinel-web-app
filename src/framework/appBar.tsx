import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import { FunctionComponent } from 'react';

interface SpendSentinelAppProps {

}

export const SpendSentinelAppBar: FunctionComponent<SpendSentinelAppProps> = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          Spend Sentinel App
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          </Typography>
          <IconButton
            onClick={()=>{alert("This does nothing!! Nothing I tell you!");}}
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            >
            <InfoIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}