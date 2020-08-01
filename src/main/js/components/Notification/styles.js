import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';

const styles = {
  message: {
    width: "calc(100% - 34px)"
  },
  action: {
    paddingLeft: 6
  },
  close: {
    color: "#fff",
    padding: 6,
  },
  error: {
    background: red[500],
    boxSizing: "initial"
  },
  success: {
    background: green[500],
    boxSizing: "initial"
  }
};

export default styles;
