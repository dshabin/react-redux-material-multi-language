import React, { Component } from 'react';
import AccountBox from '@material-ui/icons/AccountBox';
import MenuIcon from '@material-ui/icons/Menu';
import { connect } from 'react-redux';
import { translate } from '../../localization/helpers'
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { withStyles } from '@material-ui/core';
import List from '@material-ui/core/List';
import { Link } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';

const classes = theme => {
    return ({
        menuButton: {
        },
    })
}
class LeftDrawer extends Component {

    state = {}

    closeDrawer(event) {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        this.setState({ isMenuOpen: false })
    };

    openDrawer(e) {
        this.setState({ isMenuOpen: true })
    }

    render() {
        const { isMenuOpen } = this.state;
        const { classes,language } = this.props
        return (
            <>
                <IconButton onClick={this.openDrawer.bind(this)} edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                    <MenuIcon />
                </IconButton >
                <Drawer open={isMenuOpen}
                    onClick={this.closeDrawer.bind(this)}
                    onKeyDown={this.closeDrawer.bind(this)}>
                    <div style={{ width: 250 }} >
                        <List >
                            <Link to='/users' style={{ textDecoration: 'none', color: 'white' }}>
                                <ListItem button key={translate(language, "USERS")} >
                                    <ListItemIcon><AccountBox /></ListItemIcon>
                                    <ListItemText primary={translate(language, "USERS")} />
                                </ListItem>
                            </Link>
                        </List>
                    </div>
                </Drawer>
            </>
        )
    }
}

const mapStateToProps = state => {
    const { language  } = state.app

    return {
        language
    };
};

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(classes)(LeftDrawer));
