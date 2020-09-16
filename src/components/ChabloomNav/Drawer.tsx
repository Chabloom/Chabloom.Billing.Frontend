import React from "react";
import {NavLink} from "react-router-dom";

import {
    createStyles,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    makeStyles,
    Theme,
    Toolbar
} from "@material-ui/core";
import {AccountCircle, Business, Home, Payment, Receipt, Schedule} from "@material-ui/icons";

interface Props {
    userLevel: "admin" | "manager" | undefined;
    admin: boolean;
    manager: boolean;
}

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
    }),
);

export const ChabloomDrawer: React.FC<Props> = (props) => {
    const classes = useStyles();

    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper,
            }}>
            <Toolbar/>
            <div className={classes.drawerContainer}>
                <List>
                    <ListItem button key="Home" component={NavLink} to="/">
                        <ListItemIcon><Home/></ListItemIcon>
                        <ListItemText primary="Home"/>
                    </ListItem>
                </List>
                <Divider/>
                {(props.admin || props.manager) &&
                <List>
                    <ListItem button key="Accounts" component={NavLink} to="/accounts">
                        <ListItemIcon><AccountCircle/></ListItemIcon>
                        <ListItemText primary="Accounts"/>
                    </ListItem>
                    <ListItem button key="Bills" component={NavLink} to="/bills">
                        <ListItemIcon><Receipt/></ListItemIcon>
                        <ListItemText primary="Bills"/>
                    </ListItem>
                    <ListItem button key="Schedules" component={NavLink} to="/schedules">
                        <ListItemIcon><Schedule/></ListItemIcon>
                        <ListItemText primary="Schedules"/>
                    </ListItem>
                    <ListItem button key="Transactions" component={NavLink} to="/transactions">
                        <ListItemIcon><Payment/></ListItemIcon>
                        <ListItemText primary="Transactions"/>
                    </ListItem>
                </List>
                }
                <Divider/>
                {props.admin &&
                <List>
                    <ListItem button key="Tenants" component={NavLink} to="/tenants">
                        <ListItemIcon><Business/></ListItemIcon>
                        <ListItemText primary="Tenants"/>
                    </ListItem>
                </List>
                }
            </div>
        </Drawer>
    );
}
