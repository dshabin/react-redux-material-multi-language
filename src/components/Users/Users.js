import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from '../../localization/helpers'
import { withStyles } from '@material-ui/core';
import { Paper } from '@material-ui/core';
import { listUsers } from '../../_actions/users'
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { HashRouter as Switch, Route } from "react-router-dom";
import AddUser from './AddUser';
import SearchUsers from './SearchUsers';
import ChangeUser from './ChangeUser';
import { Link } from 'react-router-dom';

const classes = theme => {
    return (
        {
            root: {
                width: '100%',
                marginTop: theme.spacing(3),
                overflowX: 'auto',
            },
            title: {
                flex: '0 0 auto',
            },
        }
    );
};

class Users extends Component {
    state = {}
    
    render() {
        const { classes ,language} = this.props
        return (
            <Paper className={classes.root}>
                <Toolbar>
                    <div className={classes.title} >
                        <Link to="/users" style={{ textDecoration : 'none' }}>
                        <Typography variant="h6" id="tableTitle">
                            {translate(language, 'USERS')}
                        </Typography>
                        </Link>
                    </div>
                </Toolbar>
                <Switch>
                    <Route exact path='/users' component={SearchUsers} />
                    <Route exact path='/users/add' component={AddUser} />
                    <Route exact path='/users/:id/change' component={ChangeUser} />
                </Switch>
            </Paper >
        )
    }
}

const mapStateToProps = state => {
    const { language } = state.app
    const { users, pending } = state.users

    return {
        language,
        users,
        pending
    };
};


const mapDispatchToProps = dispatch => ({
    listUsers: (params) => dispatch(listUsers(params)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(classes)(Users));
