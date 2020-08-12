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
import { getPropertiesInfo } from "bucares/actions/propertiesActions";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Typography } from '@material-ui/core';

export class HomeView extends React.Component { 
  constructor(props) {
    super(props);
    this.state = {
      value: 0
    };
  }

  componentDidMount(){
    if (!this.props.properties.propertiesInfoLoading){
      this.props.getPropertiesInfo();
  }
  }

  handleChange = (event, newValue) => {
    this.setState({value: newValue});
  };

  render(){
    const { value } = this.state;
    const { classes, t, properties } = this.props;
    return (
      <Grid container className={classes.box}>
        <Grid item xs={12} className={classes.tag}>
          <Typography
            variant='inherit'
            color='textSecondary'
          >
            {t("homeView.appTag", {tag: properties.propertiesInfo.appTag} )}
          </Typography>
        </Grid>
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
      getPropertiesInfo
  }, dispatch)
}

export default compose(
  connect((store) => ({properties: store.get("properties")}),
        mapDispatchToProps),
  withTranslation("translation"),
  withStyles(styles)
)(HomeView);

