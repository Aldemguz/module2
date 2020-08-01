import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import CloseIcon from '@material-ui/icons/Close'
import IconButton from '@material-ui/core/IconButton'
import { connect } from "react-redux"
import { bindActionCreators, compose } from 'redux'
import { closeNotification } from "bucares/actions/notificationActions";
import withStyles from "@material-ui/core/styles/withStyles";
import { NOTIFICATION_SUCCESS } from "bucares/constants/notificationActionsTypes";
import styles from "./styles";
import Portal from "@material-ui/core/Portal";

export class Notification extends React.Component {

  constructor(props) {
    super(props);
    this.handleClose = this.handleClose.bind(this)
  }

  handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.props.closeNotification();
  };

  render() {
    const { classes, notification } = this.props;

    if (!notification.open) {
      return null
    }
    return (
      <Portal>
        <Snackbar
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={notification.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            className: notification.type === NOTIFICATION_SUCCESS ?
              classes.success : classes.error,
            classes: {
              message: classes.message,
              action: classes.action
            }
          }}
          message={<span id="message-id">{this.props.notification.message}</span>}
          action={[
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className={classes.close}
              onClick={this.handleClose}
            >
              <CloseIcon />
            </IconButton>
          ]}
        />
      </Portal>
    )
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators({ closeNotification: closeNotification }, dispatch)
}

export default compose(
  connect((store) => ({ notification: store.get('notification') }), mapDispatchToProps),
  withStyles(styles)
)(Notification);