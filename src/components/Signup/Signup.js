import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { translate } from '../../localization/helpers'
import { withStyles } from '@material-ui/core';
import { signupRequest, reset } from '../../_actions/signup'
import CircularProgress from '@material-ui/core/CircularProgress';

const classes = theme => {
    return (
        {
            signupButton: {
                marginTop: theme.spacing(1),
            },
            progress: {
                marginLeft: '10px',
            },
        }
    );
};



class Signup extends Component {

    state = { form: {}, validation: {}, isFormInitial: true }

    componentWillUnmount() {
        this.props.reset();
    }

    validateForm(form) {
        let errors = {};
        if (form.hasOwnProperty("username")) {
            if (form.username.length === 0) {
                errors.username = 'USERNAME_REQUIRED_ERROR'
            }
        }
        if (form.hasOwnProperty("password")) {
            if (form.password.length === 0) {
                errors.password = 'PASSWORD_REQUIRED_ERROR'
            }
        }
        if (form.hasOwnProperty("confirmPassword")) {
            if (form.confirmPassword.length === 0) {
                errors.confirmPassword = 'CONFIRM_PASSWORD_REQUIRED_ERROR'
            }
            if (form.confirmPassword !== form.password) {
                errors.confirmPassword = 'CONFIRM_PASSWORD_NOT_MATCH_ERROR'
            }
        }
        return errors
    }

    handleInputChange(e) {
        const form = this.state.form;
        form[e.target.id] = e.target.value;
        const validation = this.validateForm(form);

        let isFormInitial = true;
        let allFields = ["username", "password" , "confirmPassword"]
        if (allFields.length === Object.keys(form).length) {
            isFormInitial = false
        }
        this.setState({ form, validation, isFormInitial });
    }
    signupClickHandler(e) {
        this.props.signupRequest(this.state.form.username, this.state.form.password)
    }

    render() {
        const { classes ,language , pending } = this.props
        const { validation, isFormInitial } = this.state
        return (
            <>
                <Grid container justify="center" alignItems="center" direction="row"  >
                    <Grid item xs={12} sm={8} md={5} >
                        <Paper style={{ padding: '20px' }} >
                            <Typography variant="h6">
                                {translate(language, 'SIGNUP')}
                            </Typography>
                            <form noValidate autoComplete="off">
                                <TextField
                                    label={translate(language, 'USERNAME')}
                                    error={!!validation.username}
                                    placeholder={translate(language, 'USERNAME')}
                                    fullWidth
                                    onChange={this.handleInputChange.bind(this)}
                                    margin="normal"
                                    id="username"
                                    variant="outlined"
                                    autoComplete="off"
                                    disabled={pending}
                                    InputLabelProps={{ shrink: true }}
                                    helperText={translate(language, validation.username)}

                                />
                                <TextField
                                    error={!!validation.password}
                                    placeholder={translate(language, 'PASSWORD')}
                                    fullWidth
                                    id="password"
                                    onChange={this.handleInputChange.bind(this)}
                                    margin="normal"
                                    variant="outlined"
                                    autoComplete="off"
                                    label={translate(language, 'PASSWORD')}
                                    disabled={pending}
                                    type="password"
                                    InputLabelProps={{ shrink: true }}
                                    helperText={translate(language, validation.password)}
                                />
                                <TextField
                                    error={!!validation.confirmPassword}
                                    placeholder={translate(language, 'CONFIRM_PASSWORD')}
                                    fullWidth
                                    id="confirmPassword"
                                    onChange={this.handleInputChange.bind(this)}
                                    margin="normal"
                                    variant="outlined"
                                    autoComplete="off"
                                    label={translate(language, 'CONFIRM_PASSWORD')}
                                    disabled={pending}
                                    type="password"
                                    InputLabelProps={{ shrink: true }}
                                    helperText={translate(language, validation.confirmPassword)}
                                />
                                <Button
                                    fullWidth
                                    className={classes.signupButton}
                                    onClick={this.signupClickHandler.bind(this)}
                                    color="primary"
                                    variant="contained"
                                    disabled={pending || (Object.keys(validation).length !== 0) || isFormInitial}
                                    size="large" >
                                    {translate(language, 'SIGNUP')}
                                    {pending && <CircularProgress className={classes.progress} thickness={5} size={20} />}
                                </Button>
                            </form>
                        </Paper>
                    </Grid>
                </Grid>
            </>
        )
    }
}

const mapStateToProps = state => {
    const { language } = state.app
    const { pending, user, error } = state.signup
    return {
        language,
        pending,
        user,
        error
    };
};


const mapDispatchToProps = dispatch => ({
    reset: () => dispatch(reset()),
    signupRequest: (username, password) => dispatch(signupRequest(username, password)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(classes)(Signup));
