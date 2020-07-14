import React from "react";

import {
    AppBar,
    createStyles,
    CssBaseline,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Theme,
    Toolbar,
    Typography
} from "@material-ui/core";
import {AccountCircle, Business} from '@material-ui/icons'
import {NavLink} from "react-router-dom";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth,
        },
        drawerContainer: {
            overflow: 'auto',
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
    }),
);


const Nav: React.FC = (props) => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <CssBaseline/>
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" noWrap>
                        Chabloom Payments
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                className={classes.drawer}
                variant="permanent"
                classes={{
                    paper: classes.drawerPaper,
                }}>
                <Toolbar/>
                <div className={classes.drawerContainer}>
                    <List>
                        <ListItem button key="Accounts" component={NavLink} to="/accounts">
                            <ListItemIcon><AccountCircle/></ListItemIcon>
                            <ListItemText primary="Accounts"/>
                        </ListItem>
                    </List>
                    <Divider/>
                    <List>
                        <ListItem button key="Partitions" component={NavLink} to="partitions">
                            <ListItemIcon><Business/></ListItemIcon>
                            <ListItemText primary="Partitions"/>
                        </ListItem>
                    </List>
                </div>
            </Drawer>
            <main className={classes.content}>
                <Toolbar/>
                {props.children}
            </main>
        </div>
    );
};

export default Nav;
