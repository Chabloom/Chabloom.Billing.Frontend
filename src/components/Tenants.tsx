import React from "react";

import {
    Button,
    CircularProgress,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow
} from "@material-ui/core";

import {UserManager} from "oidc-client";

import {TenantsApi} from "../api/apis";
import {TenantViewModel} from "../api/models";

import {Configuration} from "../api/runtime";

interface Props {
    userManager: UserManager,
}

const Tenants: React.FC<Props> = (props) => {
    const [tenants, setTenants] = React.useState<TenantViewModel[]>();
    const [dialogTenant, setDialogTenant] = React.useState<TenantViewModel>();
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

    if (!tenants) {
        props.userManager.getUser()
            .then(value => {
                if (value) {
                    // Get an instance of tenants API
                    const headers = {
                        'Authorization': `Bearer ${value?.access_token}`
                    }
                    const tenantsApi = new TenantsApi(new Configuration({headers: headers}));
                    // Get all tenants
                    console.log('loading tenants')
                    tenantsApi.apiTenantsGet()
                        .then(value => setTenants(value));
                } else {
                    localStorage.setItem("redirectUri", window.location.pathname);
                    props.userManager.signinRedirect({});
                }
            });
        return <CircularProgress/>
    } else {
        return (
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell/>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {tenants?.map((tenant) => (
                            <TableRow key={tenant.id}>
                                <TableCell>{tenant.name}</TableCell>
                                <TableCell align="right">
                                    <Button variant="contained" color="primary" onClick={() => {
                                        setDialogTenant(tenant);
                                        setDialogOpen(true);
                                    }}>Details</Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        );
    }
};

export default Tenants;
