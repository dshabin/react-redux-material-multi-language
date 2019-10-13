import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from '../../localization/helpers'
import logo from '../../logo-1.png'
import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import { Link } from 'react-router-dom';
import LeftDrawer from './LeftDrawer'
import RightDrawer from './RightDrawer';

const classes = theme => {
    return ({})
}

class NavBar extends Component {

    state = {}
    
    render() {
        const { user, language } = this.props;
        return (
            <AppBar position="static" color="inherit">
                <Toolbar>
                    <div style={{ flex: 1 }}>
                        {user && <LeftDrawer />}
                        <Link to='/' style={{ marginLeft: '10px' }}>
                            <IconButton edge="start" color="inherit" aria-label="profile-menu">
                                <img src={logo} alt="logo" height="50" width="50" />
                            </IconButton >
                        </Link>
                    </div>
                    {user ? <RightDrawer /> : <>
                        <Link to='/login' style={{ textDecoration: 'none' }}>
                            <Button style={{ margin: '5px' }} color="default">
                                {translate(language, "LOGIN")}
                            </Button>
                        </Link>
                        <Link to='/signup' style={{ textDecoration: 'none' }}>
                            <Button variant="contained" color="primary">
                                {translate(language, "SIGNUP")}
                            </Button>
                        </Link>
                    </>}
                </Toolbar>
            </AppBar>
        )
    }
}

const mapStateToProps = state => {
    const { language, user } = state.app

    return {
        language, user
    };
};

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(classes)(NavBar));
