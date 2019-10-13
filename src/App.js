import React, { Component } from 'react';
import { ThemeProvider } from '@material-ui/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import { HashRouter as Switch, Route, HashRouter, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import { fetchCurrent } from './_actions/app'
import { getLanguageDir } from './localization/helpers'
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import { withStyles } from '@material-ui/core';
import Login from './components/Login/Login'
import Signup from './components/Signup/Signup'
import Notification from './components/Notification/Notification'
import Home from './components/Home/Home';
import Users from './components/Users/Users';
import NavBar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';


function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />}
    />
  )
}

const classes = theme => {
  return ({
    root: {
      flexGrow: 1,
    },
    formControl: {
      margin: theme.spacing(5),
      minWidth: 120,
    },
    container : {
      marginTop: theme.spacing(3)
    },
    divider : {
      marginTop : theme.spacing(3)
    }
  })
}

class App extends Component {

  state = { }

  componentDidMount() {
    if (localStorage.getItem('token')) { this.props.fetchCurrent() }
  }
  
  render() {
    const { classes ,user , language} = this.props
    const languageDir = getLanguageDir(language)
    document.body.dir = languageDir;

    const theme = createMuiTheme({
      direction: languageDir,
      palette: {
        type: 'dark',
        primary: blue,
      },
    });

    const authed = !!user || !!localStorage.getItem('token')

    return (
      <div className={classes.root}>
        <HashRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <NavBar />
            <Container className={classes.container}>
              <Switch>
                <Route exact path="/signup" render={() => (user ? (<Redirect to="/" />) : (<Signup />))} />
                <Route exact path="/login" render={() => (user ? (<Redirect to="/" />) : (<Login />))} />
                <PrivateRoute authed={authed} exact path='/' component={Home} />
                <PrivateRoute authed={authed} path='/users' component={Users} />
              </Switch>
            </Container>
            <Divider className={classes.divider} />
            <Footer/>
            <Notification />
          </ThemeProvider>
        </HashRouter>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { language, error, user, pending } = state.app

  return {
    language, error, user, pending
  };
};

const mapDispatchToProps = dispatch => ({
  fetchCurrent: () => dispatch(fetchCurrent())
})

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(classes)(App));

