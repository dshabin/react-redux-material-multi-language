import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from '../../localization/helpers'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { deepOrange } from '@material-ui/core/colors';
import { withStyles } from '@material-ui/core';
import List from '@material-ui/core/List';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ExitToApp from '@material-ui/icons/ExitToApp';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { logout } from '../../_actions/app'


const classes = theme => {
    return ({
        avatarContainer: {
            marginTop: theme.spacing(5),
        },
        avatarDivider: {
            marginTop: theme.spacing(5),
        },
        avatar: {
            backgroundColor: deepOrange[500],
            color: '#fff',
        },
        bigAvatar: {
            backgroundColor: deepOrange[500],
            color: '#fff',
            width: '80px',
            height: '80px'

        },
        avatarUsername: {
            marginTop: theme.spacing(1)
        }
    })
}
class RightDrawer extends Component {
    state= {}

    openProfileDrawer(e) {
        this.setState({ isProfileDrawerOpen: true })
    }

    closeProfileDrawer(e) {
        this.setState({ isProfileDrawerOpen: false })
    }


    logout(e) {
        this.props.logout()
    }

    render() {
        const { user, language , classes  } = this.props;
        const { isProfileDrawerOpen  } = this.state
        return (
            <>
            {user && <>
                <IconButton onClick={this.openProfileDrawer.bind(this)} edge="start" color="inherit" aria-label="profile-menu">
                    <Avatar className={classes.avatar}>{user.username.charAt(0).toUpperCase()}</Avatar>
                </IconButton >
                <Drawer open={isProfileDrawerOpen}
                    onClick={this.closeProfileDrawer.bind(this)}
                    onKeyDown={this.closeProfileDrawer.bind(this)}
                    anchor="right"
                >
                    <div style={{ width: 250 }} >
                        <Grid container justify="center" direction="column" className={classes.avatarContainer} alignItems="center">
                            <Avatar className={classes.bigAvatar}>{user.username.charAt(0).toUpperCase()}</Avatar>
                            <Grid item>
                                <Typography className={classes.avatarUsername} variant="h6" display="block">
                                    {user.username}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Divider className={classes.avatarDivider} />
                        <List >
                            <ListItem onClick={this.logout.bind(this)} button key={translate(language, "LOGOUT")} >
                                <ListItemIcon><ExitToApp /></ListItemIcon>
                                <ListItemText primary={translate(language, "LOGOUT")} />
                            </ListItem>
                        </List>
                    </div>
                </Drawer>
            </>}
            </>
        )
    }
}

const mapStateToProps = state => {
    const { language, error, user } = state.app
    return {
        language, error, user
    };
};

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(classes)(RightDrawer));


