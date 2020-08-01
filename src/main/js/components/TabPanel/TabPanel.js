import React from 'react';
import { compose } from 'redux';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';

export class TabPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render(){
  const { children, value, index, ...other } = this.props;

    return (
      <Grid
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box p={3}>
            {children}
          </Box>
        )}
      </Grid>
    );
      }
}

export default compose()(TabPanel);