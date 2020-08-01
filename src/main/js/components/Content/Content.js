import React from 'react';
import { Typography, withStyles, Grid } from '@material-ui/core';
import { compose, bindActionCreators } from 'redux';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { connect } from 'react-redux';
import styles from './styles';
import { deleteContent } from "bucares/actions/contentActions";

export class Content extends React.Component {
  constructor(props) {
    super(props);
  }

  handleDelete = (url) => {
    const payload = {
      "url": url
    }
    this.props.deleteContent(payload);
  }

  render(){
    const { url, classes } = this.props;
    return(
      <Grid item xs={12}>
            <IconButton onClick={this.handleDelete.bind(this, url)} className={classes.closeButton}>
              <DeleteIcon color="error" fontSize="small" />
            </IconButton>
        <Typography>{url}</Typography>
      </Grid>
    )
  }

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    deleteContent
  }, dispatch)
}

export default compose(
  connect(null,mapDispatchToProps),
  withStyles(styles)
)(Content);