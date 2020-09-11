import React from "react";

import {LinearProgress, Toolbar, Typography} from "@material-ui/core";
import {Alert, AlertTitle} from "@material-ui/lab";

import {TenantViewModel} from "../../models";

interface Props {
    title: string,
    tenant: TenantViewModel | undefined,
    processing: boolean,
    error: string,
}

export const ChabloomTableHeading: React.FC<Props> = props =>
    <div>
        <Toolbar>
            <Typography
                variant="h6">{props.tenant ? `${props.tenant?.name} ${props.title}` : props.title}
            </Typography>
        </Toolbar>
        {props.processing && <LinearProgress/>}
        {props.error &&
        <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            {props.error}
        </Alert>
        }
    </div>
