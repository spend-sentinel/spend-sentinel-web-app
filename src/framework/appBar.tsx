import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { FunctionComponent, useState } from 'react';
import Dialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import Tooltip from '@mui/material/Tooltip';

// Define styles for the dialog's Paper component using styled
const StyledDialog = styled(Dialog)(() => ({
  '& .MuiPaper-root': {
    position: 'sticky',
    top: '80%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    marginTop: '-25%',
    border: '3px solid black',
    backgroundColor: 'lightgray',
  },
}));

const textStyling: React.CSSProperties = {
  width: 'auto',
  position: 'relative',
  display: 'block',
  textAlign: 'justify',
  margin: '10px',
  justifyContent: 'center',
  alignItems: 'stretch'
};

const headerStyling: React.CSSProperties = {
  ...textStyling,
  display: 'flex'
};

export const SpendSentinelAppBar: FunctionComponent = () => {
  const [infoBoxVisible, setInfoBoxVisible] = useState(false);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          Spend Sentinel App
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}></Typography>
          <IconButton
            onClick={() => setInfoBoxVisible(true)}
            color="inherit"
          >
            <InfoIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <StyledDialog
        onClose={() => setInfoBoxVisible(false)}
        open={infoBoxVisible}
      >
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <h1 style={headerStyling}>About Spend-Sentinel</h1>
          <Tooltip title="Back to app" arrow>
            <IconButton
              onClick={() => setInfoBoxVisible(false)}
              color="inherit"
            >
              <ExitToAppIcon />
            </IconButton>
          </Tooltip>
        </div>
        <ul style={textStyling}>
          {getInfoBulletPoints().map((bulletPoint: string) => {
            return (<li key={bulletPoint}>{bulletPoint}</li>);
          })}
        </ul>
      </StyledDialog>
    </Box>
  );
};

const getInfoBulletPoints = (): string[] => {
  const bulletPointsArray = [
    "Spend-Sentinel is an open-source application designed to help users track their money transactions made through credit cards.",
    "It provides an intuitive way to monitor and categorize expenses, enabling users to gain a clearer understanding of their spending habits.",
    "Whether you're managing personal finances or keeping an eye on business expenditures, Spend-Sentinel offers a reliable solution to stay on top of your financial activities.",
    "Thank you for using Spend-Sentinel, and we hope you have a great experience!",
    "If you encounter any issues or have feedback, please don't hesitate to contact us.",
  ];
  return bulletPointsArray;
}
