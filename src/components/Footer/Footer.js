import React, { Component } from 'react';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FormControl from '@material-ui/core/FormControl';
import { selectLanguage } from '../../_actions/app'
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';

const classes = theme => {
    return ({
        root: {
            flexGrow: 1,
        },
        formControl: {
            margin: theme.spacing(2),
            minWidth: 120,
        },
    })
}

class Footer extends Component {
    state = {}

    languageSelectChangeHandler(e) {
        this.props.selectLanguage(e.target.value)
    }
    render() {
        const { classes, language } = this.props
        return (
            <FormControl variant="outlined" className={classes.formControl}>
                <Select
                    native
                    margin="dense"
                    value={language ? language : "english"}
                    onChange={this.languageSelectChangeHandler.bind(this)}
                    input={
                        <OutlinedInput name="language" id="outlined-native-simple" />
                    }
                >
                    <option value="english">English</option>
                    <option value="farsi">فارسی</option>
                </Select>
            </FormControl>
        )
    }
}



const mapStateToProps = state => {
    const { language, error, user, pending } = state.app

    return {
        language, error, user, pending
    };
};

const mapDispatchToProps = dispatch => ({
    selectLanguage: (language) => dispatch(selectLanguage(language)),
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(classes)(Footer));
