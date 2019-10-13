import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from '../../localization/helpers'
import { withStyles } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import { addUser, reset } from '../../_actions/users'

const classes = theme => {
    return (
        {
            root: {
                width: '100%',
                marginTop: theme.spacing(3),
                overflowX: 'auto',
            },
            table: {
                minWidth: 650,
            },
            progress: {
                margin: theme.spacing(2)
            },
            createButton: {
                marginTop: theme.spacing(1),
                marginLeft: theme.spacing(1)

            },
            cancelButton: {
                marginTop: theme.spacing(1),

            },

            title: {
                flex: '0 0 auto',
            },
            spacer: {
                flex: '1 1 100%',
            },
            actions: {
                color: theme.palette.text.secondary,
            },
            searchButton: {
                marginTop: theme.spacing(1)
            },
            formPaper: {
                padding: theme.spacing(2),
                marginBottom: theme.spacing(4),

            },
            wrapper: {
                padding: theme.spacing(2)
            },
        }
    );
};

class AddUser extends Component {
    state = {}
   

    componentWillUnmount() {
        this.props.reset();
    }


    inputChangeHandler(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    addUserHandler(e) {
        this.props.addUser({
            username: this.state.username,
            password: this.state.password
        })
    }

    render() {

        const { classes , language, pending, createdUser } = this.props
        if(createdUser){
            this.props.history.push('/users')
        }
        return (
            <div className={classes.wrapper}>
                <Paper className={classes.formPaper}>
                    <div className={classes.title} >
                        <Typography variant="h6" id="tableTitle">
                            {translate(language, 'ADD_USER')}

                        </Typography>
                    </div>
                    <form noValidate style={{ marginTop: '10px' }} autoComplete="off">
                        <TextField
                            className={classes.searchTextField}
                            fullWidth
                            id="username"
                            label={translate(language, 'USERNAME')}
                            margin="dense"
                            variant="outlined"
                            onChange={this.inputChangeHandler.bind(this)}
                        />
                        <TextField
                            className={classes.searchTextField}
                            fullWidth
                            id="password"
                            label={translate(language, 'PASSWORD')}
                            margin="dense"
                            variant="outlined"
                            onChange={this.inputChangeHandler.bind(this)}
                        />

                        <Link to='/users' style={{ textDecoration: 'none' }}>
                            <Button
                                className={classes.cancelButton}
                                color="primary"
                                variant="contained"
                                disabled={pending}
                                size="medium" >
                                {translate(language, 'CANCEL')}
                            </Button>
                        </Link>


                        <Button
                            className={classes.createButton}
                            onClick={this.addUserHandler.bind(this)}
                            color="primary"
                            variant="contained"
                            disabled={pending}
                            size="medium" >
                            {translate(language, 'SAVE')}

                            {pending && <CircularProgress thickness={5} size={20} />}
                        </Button>
                    </form>
                </Paper>
            </div>
        )
    }
}

const mapStateToProps = state => {
    const { language } = state.app
    const { pending, createdUser } = state.users

    return {
        language,
        pending,
        createdUser
    };
};


const mapDispatchToProps = dispatch => ({
    addUser: (params) => dispatch(addUser(params)),
    reset: () => dispatch(reset()),

})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(classes)(AddUser));
