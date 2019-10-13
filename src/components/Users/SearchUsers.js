import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import TablePagination from '@material-ui/core/TablePagination';
import { Paper } from '@material-ui/core';
import { listUsers } from '../../_actions/users'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import CircularProgress from '@material-ui/core/CircularProgress';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import { Link } from 'react-router-dom';
import { translate } from '../../localization/helpers'

const classes = theme => {
    return (
        {
            root: {
                width: '100%',
                marginTop: theme.spacing(3),
                overflowX: 'auto',
            },
            table: {
               // minWidth: 650,
            },
            progress: {
                margin: theme.spacing(2)
            },
            createButton: {
                marginTop: theme.spacing(1),
                marginLeft: theme.spacing(1)

            },
            searchTextField: {
                marginTop: theme.spacing(2)
            },
            visuallyHidden: {
                border: 0,
                clip: 'rect(0 0 0 0)',
                height: 1,
                margin: -1,
                overflow: 'hidden',
                padding: 0,
                position: 'absolute',
                top: 20,
                width: 1,
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
                padding: theme.spacing(2)
            },
            wrapper: {
                padding: theme.spacing(2)
            },
            tableWrapper :{

            }
        }
    );
};

class SearchUsers extends Component {
    state = {
        search: '',
        search_field: 'username',
        page: 0,
        rowsPerPage: 10,
        limit: 10,
        offset: 0,
        order: 'asc',
        orderBy: 'date_joined'
    }


    handleChangePage(e, page) {
        const offset = page * this.state.rowsPerPage
        const params = {
            limit: this.state.rowsPerPage,
            offset: offset
        }
        this.props.listUsers(params)
        this.setState({ page })
    }

    handleChangeRowsPerPage(e) {
        this.setState({ rowsPerPage: e.target.value })
    }

    createSortHandler(rowId) {
        let order;
        if (this.state.orderBy === rowId) {
            order = this.state.order === 'asc' ? 'desc' : 'asc'
        } else {
            order = this.state.order
        }
        const params = {
            offset: 0,
            limit: 10,
            order_by: rowId,
            order_direction: order
        }
        this.props.listUsers(params);
        this.setState({ orderBy: rowId, order })
    }

    searchFieldChangeHandler(e) {
        this.setState({
            search: e.target.value
        })
        if (e.target.value === '') {
            const params = {
                offset: 0,
                limit: 10,
            }
            this.props.listUsers(params);
        }
    }

    searchFieldSelectChangeHandler(e) {
        this.setState({
            search_field: e.target.value
        })
    }

    searchClickHandler(e) {
        const params = {
            offset: 0,
            limit: 10,
            order_by: this.state.orderBy,
            order_direction: this.state.order,
            search: this.state.search,
            search_field: this.state.search_field
        }
        this.props.listUsers(params);
    }

    componentDidMount() {
        const params = {
            offset: this.state.offset,
            limit: this.state.limit
        }
        this.props.listUsers(params)
    }

    render() {
        const { classes , language, users, pending } = this.props
        const { page, orderBy, order } = this.state
        const headRows = [
            { id: 'username', numeric: false, disablePadding: false, label: 'Username' },
            { id: 'date_joined', numeric: true, disablePadding: false, label: 'Date Joined' },
        ];
        return (
            <>
                <div className={classes.wrapper}>
                    <Paper className={classes.formPaper}>
                        <div className={classes.title} >
                            <Typography variant="h6" id="tableTitle">
                                {translate(language, 'SEARCH_USERS')}
                            </Typography>
                        </div>
                        <form noValidate style={{ marginTop: '10px' }} autoComplete="off">
                            <Select
                                fullWidth
                                native
                                className={classes.searchFieldSelect}
                                margin="dense"
                                value={this.state.searchFieldSelect ? this.state.searchFieldSelect : "username"}
                                onChange={this.searchFieldSelectChangeHandler.bind(this)}
                                input={
                                    <OutlinedInput name="language" id="outlined-native-simple" />
                                }
                            >
                                <option value="username">username</option>
                            </Select>
                            <TextField
                                className={classes.searchTextField}
                                fullWidth
                                id="outlined-search"
                                label={translate(language, 'SEARCH')}
                                type="search"
                                margin="dense"
                                variant="outlined"
                                onChange={this.searchFieldChangeHandler.bind(this)}
                            />
                            <Button
                                className={classes.searchButton}
                                onClick={this.searchClickHandler.bind(this)}
                                color="primary"
                                variant="contained"
                                disabled={pending}
                                size="medium" >
                                {translate(language, 'SEARCH')}
                                {pending && <CircularProgress thickness={5} size={20} />}
                            </Button>
                            <Link to='/users/add' style={{ textDecoration: 'none' }}>
                                <Button
                                    className={classes.createButton}
                                    color="primary"
                                    variant="contained"
                                    disabled={this.state.pending}
                                    size="medium" >
                                    {translate(language, 'ADD_USER')}
                                    {pending && <CircularProgress thickness={5} size={20} />}
                                </Button>
                            </Link>
                        </form>
                    </Paper>
                </div>
                <div className={classes.wrapper}>
                    {users &&
                        <>
                            <Paper className={classes.tableWrapper}>
                                <Table className={classes.table}>
                                    <TableHead>
                                        <TableRow>
                                            {headRows.map(row => (
                                                <TableCell
                                                    key={row.id}
                                                    align={row.numeric ? 'right' : 'left'}
                                                    padding={row.disablePadding ? 'none' : 'default'}
                                                    sortDirection={orderBy === row.id ? order : false}
                                                >
                                                    <TableSortLabel
                                                        active={orderBy === row.id}
                                                        direction={order}
                                                        onClick={this.createSortHandler.bind(this, row.id)}
                                                    >
                                                        {row.label}
                                                        {orderBy === row.id ? (
                                                            <span className={classes.visuallyHidden}>
                                                                {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                                            </span>
                                                        ) : null}
                                                    </TableSortLabel>
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {users.result
                                            .map(row => (
                                                <TableRow key={row.username} hover>
                                                    <TableCell component="th" scope="row">
                                                        <Link key={row.id} to={`users/${row.id}/change`} style={{ textDecoration: 'none' }}>
                                                            {row.username}
                                                        </Link>
                                                    </TableCell>
                                                    <TableCell align="right">{row.date_joined}</TableCell>
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                                <TablePagination
                                    rowsPerPageOptions={[]}
                                    component="div"
                                    count={users.count}
                                    rowsPerPage={10}
                                    page={page}
                                    backIconButtonProps={{
                                        'aria-label': 'previous page',
                                    }}
                                    nextIconButtonProps={{
                                        'aria-label': 'next page',
                                    }}
                                    onChangePage={this.handleChangePage.bind(this)}
                                />
                            </Paper>
                        </>

                    }
                </div>
            </>
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



export default connect(mapStateToProps, mapDispatchToProps)(withStyles(classes)(SearchUsers));
