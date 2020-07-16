import React from "react";

import {Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";

import {PartitionsApi} from "../api/apis";
import {PartitionViewModel} from "../api/models";
import PartitionDetails from "./PartitionDetails";

const Partitions: React.FC = () => {
    const [partitions, setPartitions] = React.useState<PartitionViewModel[]>();
    const [dialogPartition, setDialogPartition] = React.useState<PartitionViewModel>();
    const [dialogOpen, setDialogOpen] = React.useState<boolean>(false);

    // Attempt to load Partitions until successful
    if (partitions === undefined) {
        // Get an instance of Partitions API
        const partitionsApi = new PartitionsApi();
        // Get all Partitions
        partitionsApi.apiPartitionsGet()
            .subscribe({
                next(value) {
                    setPartitions(value as PartitionViewModel[]);
                },
            });
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Enabled</TableCell>
                        <TableCell/>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {partitions?.map((partition) => (
                        <TableRow key={partition.id}>
                            <TableCell>{partition.name}</TableCell>
                            <TableCell>{partition.enabled ? "True" : "False"}</TableCell>
                            <TableCell align="right">
                                <Button variant="contained" color="primary" onClick={() => {
                                    setDialogPartition(partition);
                                    setDialogOpen(true);
                                }}>Details</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            {dialogPartition !== undefined &&
            <PartitionDetails open={dialogOpen} partition={dialogPartition} close={() => setDialogOpen(false)}/>}
        </TableContainer>
    );
};

export default Partitions;
