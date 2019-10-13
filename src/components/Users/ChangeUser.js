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
import { getUser, reset, updateUser, deleteUser } from '../../_actions/users'

const classes = theme => {
    return (
        {
            root: {
                width: '100%',
                marginTop: theme.spacing(3),
                overflowX: 'auto',
            },
            wrapper: {
                padding: theme.spacing(2)
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
            deleteButton: {
                marginTop: theme.spacing(1),
                marginLeft: theme.spacing(1)

            }
        }
    );
};

class ChangeUser extends Component {
    state = {}

    componentWillUnmount() {
        this.props.reset();
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.getUser(id)
        this.setState({ id })
    }

    inputChangeHandler(e) {
        this.setState({
            [e.target.id]: e.target.value
        })
    }

    saveHandler(e) {
        const id = this.state.id
        const params = {
            username: this.state.username
        }
        this.props.updateUser(id, params)
    }

    deleteHandler(e) {
        this.props.deleteUser(this.state.id)
    }

    render() {
        const { classes, language, pending, user, deleted, updated } = this.props
        const username = this.state.hasOwnProperty('username') ? this.state.username : user && user.username
        if (deleted || updated) {
            this.props.history.push('/users')
        }

        return (
            <div className={classes.wrapper}>
                <Paper className={classes.formPaper}>
                    <div className={classes.title} >
                        <Typography variant="h6" id="tableTitle">
                            {translate(language, 'CHANGE_USER')}
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
                            value={username || ''}
                        />

                        <Link to='/users' style={{ textDecoration: 'none' }}>
                            <Button
                                className={classes.cancelButton}
                                color="primary"
                                variant="contained"
                                disabled={pending}
                                size="medium" >
                                {translate(language, 'CANCEL')}
                                {pending && <CircularProgress thickness={5} size={20} />}
                            </Button>
                        </Link>
                        <Button
                            className={classes.createButton}
                            onClick={this.saveHandler.bind(this)}
                            color="primary"
                            variant="contained"
                            disabled={pending}
                            size="medium" >
                            {translate(language, 'SAVE')}
                            {pending && <CircularProgress thickness={5} size={20} />}
                        </Button>
                        <Button
                            className={classes.deleteButton}
                            onClick={this.deleteHandler.bind(this)}
                            color="secondary"
                            variant="contained"
                            disabled={pending}
                            size="medium" >
                            {translate(language, 'DELETE')}
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
    const { pending, user, deleted, updated } = state.users

    return {
        language,
        pending,
        user,
        deleted,
        updated
    };
};


const mapDispatchToProps = dispatch => ({
    getUser: (id) => dispatch(getUser(id)),
    updateUser: (id, params) => dispatch(updateUser(id, params)),
    deleteUser: (id) => dispatch(deleteUser(id)),
    reset: () => dispatch(reset()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(classes)(ChangeUser));
