import React from "react";

import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    FormControlLabel,
    FormGroup,
    LinearProgress,
    Switch,
    TextField
} from "@material-ui/core";

import {ApiPartitionsIdPutRequest, PartitionsApi} from "../api/apis";
import {PartitionViewModel} from "../api/models";

interface Props {
    open: boolean,
    partition: PartitionViewModel,
    close: CallableFunction,
}

const PartitionDetails: React.FC<Props> = (props) => {
    let [saving, setSaving] = React.useState<boolean>(false);

    return (
        <Dialog open={props.open} onClose={() => props.close()}>
            <DialogTitle>{`Partition ${props.partition.name}`}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    View and change properties for partition {props.partition.name}
                </DialogContentText>
                <FormGroup>
                    <TextField label={"Id"} defaultValue={props.partition.id} disabled={true}/>
                    <TextField label={"Name"} defaultValue={props.partition.name}
                               onChange={(event => props.partition.name = event.target.value)}/>
                    <FormControlLabel
                        control={
                            <Switch
                                checked={props.partition.enabled}
                                color="primary"
                                onChange={(event => props.partition.enabled = event.target.checked)}/>
                        }
                        label="Enabled"/>
                </FormGroup>
            </DialogContent>
            <DialogActions>
                <Button color="primary" disabled={saving} onClick={() => props.close()}>
                    Cancel
                </Button>
                <Button color="primary" disabled={saving} onClick={() => {
                    const partitionsApi = new PartitionsApi();
                    const request = {
                        id: props.partition.id,
                        partitionViewModel: props.partition,
                    } as ApiPartitionsIdPutRequest;
                    setSaving(true);
                    partitionsApi.apiPartitionsIdPut(request)
                        .subscribe({
                            error(err) {
                                console.log(err);
                                setSaving(false);
                            },
                            complete() {
                                props.close();
                                setSaving(false);
                            },
                        });
                }} autoFocus>
                    Save
                </Button>
            </DialogActions>
            {saving && <LinearProgress/>}
        </Dialog>
    );
}

export default PartitionDetails;
