import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from '../../localization/helpers'
import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { Paper } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';

const classes = theme => {
    return (
        {
            paper: {
                padding: '20px'
            },
        }
    );
};

class Home extends Component {
    state = {}

    render() {
        const { classes , language } = this.props

        return (
            <>
                <Grid container justify="center" alignItems="center" direction="row"  >
                    <Grid item xs={12} sm={12} md={12} >
                        <Paper className={classes.paper} >
                            <Typography variant="h6">
                                {translate(language, 'HOME')}
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </>
        )
    }
}

const mapStateToProps = state => {
    const { language } = state.app
    return {
        language,
    };
};


const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(classes)(Home));
