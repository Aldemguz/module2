import React from "react"
import { compose } from "redux";
import Grid from '@material-ui/core/Grid';
import { withTranslation } from "react-i18next";
import Button from "@material-ui/core/Button";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { connect } from "react-redux";
import { checkContent, cleanContent } from "bucares/actions/contentActions";
import { bindActionCreators } from "redux";
import { Typography, withStyles, Box } from "@material-ui/core";
import styles from "./styles";
import Loader from 'react-loader-spinner';
import {
    LOADER_TYPE,
    LOADER_COLOR,
    LOADER_HEIGHT,
    LOADER_WIDTH
  } from "bucares/constants/loaderStyles";
import {Content} from 'bucares/models/Content';

export class SearchView extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          url: "",
          word: "",
          isLoading: false,
        };
    }

    componentDidMount(){
      this.props.cleanContent();
    }
    
    handleChange = (event) => {
      this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = async () => {
        const { url, word} = this.state;

        this.setState({isLoading:true});
        await this.props.checkContent(new Content({ url, word }));
        this.setState({isLoading:false});
    };


    render() {
        const {t, classes} = this.props;
        return (
            <Grid container alignItems= "center">
                <ValidatorForm
                    ref="form"
                    onSubmit={this.handleSubmit}
                    onError={errors => console.log(errors)}
                >
                    <Grid item xs={12}>
                        <TextValidator
                        name="url"
                        id="url"
                        label={t("url")}
                        value={this.state.url}
                        onChange={this.handleChange}
                        fullWidth
                        margin="normal"
                        validators={['required', 'isUrl']}
                        errorMessages={[t("validator.required"),t("validator.isUrl")]}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextValidator
                        name="word"
                        id="word"
                        label={t("word")}
                        value={this.state.word}
                        onChange={this.handleChange}
                        fullWidth
                        margin="normal"
                        validators={["required", "maxLength:15"]}
                        errorMessages={[t('validator.required'),t("validator.maxLength", { number: 15 })]}
                        />
                    </Grid>
                <Grid item xs={12} sm={12}>
                    <Button 
                        variant="contained"
                        color="primary"
                        type="submit"
                        disabled={this.state.isLoading}
                        >
                        {t("searchButton")}
                    </Button>
                </Grid>
                {this.state.isLoading &&
                  <Box ml="25px" display="flex">
                    <Loader
                      type={LOADER_TYPE}
                      color={LOADER_COLOR}
                      height={LOADER_HEIGHT}
                      width={LOADER_WIDTH}
                    />
                  </Box>
                }
              </ValidatorForm>
              {(!this.state.isLoading && this.props.accepted) && 
              <Grid item xs={12} className = {classes.response}>
                <Typography>{this.props.accepted}</Typography>
              </Grid>}
            </Grid>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        checkContent,
        cleanContent
    }, dispatch)
}


export default compose(
    connect((store) => {
        return{
            accepted: store.get("content").currentUrlIsAccepted
        }
    },mapDispatchToProps),
    withTranslation("translation"),
    withStyles(styles)
)(SearchView);
