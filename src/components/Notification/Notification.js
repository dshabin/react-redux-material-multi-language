import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import CloseIcon from '@material-ui/icons/Close';
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import { notification } from '../../_actions/notification';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import WarningIcon from '@material-ui/icons/Warning';
import { amber, green } from '@material-ui/core/colors';
import clsx from 'clsx';

const classes = theme => {
    return (
        {
            success: {
                backgroundColor: green[600],
                color: '#ffffff'
            },
            error: {
                backgroundColor: theme.palette.error.dark,
                color: '#ffffff'
            },
            info: {
                backgroundColor: theme.palette.primary.main,
                color: '#ffffff'
            },
            warning: {
                backgroundColor: amber[700],
                color: '#ffffff'
            },
            icon: {
                fontSize: 20,
            },
            iconVariant: {
                opacity: 0.9,
                marginRight: theme.spacing(1),
            },
            message: {
                display: 'flex',
                alignItems: 'center',
            },
        }
    );
};

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

class Notification extends Component {

    state = {}

    closeSnack(e) {
        this.props.sendNotification(null)
    }

    render() {
        const { classes, notification } = this.props
        if (notification) {
            const Icon = variantIcon[notification && notification.type];
            return (
                <Snackbar
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                    }}
                    open={!!notification}
                    autoHideDuration={3000}
                    onClose={this.closeSnack.bind(this)}

                >

                    <SnackbarContent
                        className={clsx(classes[notification.type])}
                        aria-describedby="client-snackbar"
                        message={
                            <span id="client-snackbar" className={classes.message}>
                                <Icon className={clsx(classes.iconVariant, classes.icon)} />
                                {notification.message}
                            </span>
                        }
                        action={[
                            <IconButton onClick={this.closeSnack.bind(this)} key="close" aria-label="close" color="inherit" >
                                <CloseIcon className={classes.icon} />
                            </IconButton>,
                        ]}
                    />
                </Snackbar>
            )
        } else {
            return (
                ""
            )
        }

    }
}

const mapStateToProps = state => {
    const { notification } = state.notification
    return {
        notification
    };
};

const mapDispatchToProps = dispatch => ({
    sendNotification: (message) => dispatch(notification(message)),

})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(classes)(Notification));
