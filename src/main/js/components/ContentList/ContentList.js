import React from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { withStyles, Typography } from '@material-ui/core';
import { compose } from 'redux';
import styles from './styles';
import { bindActionCreators } from 'redux';
import { getContents } from "bucares/actions/contentActions";
import Grid from '@material-ui/core/Grid';
import Content from 'bucares/components/Content';

export class ContentList extends React.Component {
  constructor(props) {
    super(props);
  }

  handleDelete = (url) => {
    const payload = {
      "url": url
    }
    this.props.deleteContent(payload);
  }
  

  componentDidMount(){
    this.props.getContents();
  }

  render(){

    const { t, contentList, classes } = this.props;

    const isEmpty = (
      <Grid item xs={12}>
          <Typography color="initial">
              {t("contentList.isEmpty")}
          </Typography>
      </Grid>
    );

    return(
      <Grid container>
        {(contentList && contentList.length != 0) ? 
        contentList.map((content, index)=> (
            <Content url={content.url} key={index} className={classes.content}/>
         )): isEmpty}
      </Grid>
    )
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getContents
  }, dispatch)
}

export default compose(
  connect((store) => {
      return{
          contentList: store.get("content").urlAcceptedList
      }
  },mapDispatchToProps),
  withTranslation("translation"),
  withStyles(styles)
)(ContentList);