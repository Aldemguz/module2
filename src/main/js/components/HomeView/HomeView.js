import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { compose } from 'redux';
import styles from './styles';
import SearchView from 'bucares/components/SearchView';
import ContentList from 'bucares/components/ContentList';
import Grid from '@material-ui/core/Grid';
import TabPanel from 'bucares/components/TabPanel';
import { withTranslation } from 'react-i18next';

export class HomeView extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  handleChange = (event, newValue) => {
    this.setState({value: newValue});
  };

  render(){
    const { value } = this.state;
    const { classes, t } = this.props;
    return (
      <Grid container className={classes.box}>
        <AppBar position="static" >
          <Tabs
            value={value}
            onChange={this.handleChange.bind(this)}
            centered
          >
            <Tab label={t("homeView.checkContent")} {...a11yProps(0)} />
            <Tab label={t("homeView.authorizedList")} {...a11yProps(1)} />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <SearchView/>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ContentList/>
        </TabPanel>
      </Grid>
    );
  }
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default compose(
  withTranslation("translation"),
  withStyles(styles)
)(HomeView);

