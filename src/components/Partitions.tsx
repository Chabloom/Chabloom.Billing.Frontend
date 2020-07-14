import React from "react";

import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";

import {PartitionsApi} from "../api/apis";
import {PartitionViewModel} from "../api/models";

const Partitions: React.FC = () => {
    const [partitions, setPartitions] = React.useState<PartitionViewModel[]>();

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
                    </TableRow>
                </TableHead>
                <TableBody>
                    {partitions?.map((partition) => (
                        <TableRow key={partition.id}>
                            <TableCell>{partition.name}</TableCell>
                            <TableCell>{partition.enabled ? "True" : "False"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default Partitions;
