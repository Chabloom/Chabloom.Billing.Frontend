import React from 'react';
import renderer from 'react-test-renderer';
import PartitionDetails from "./PartitionDetails";
import {PartitionViewModel} from "../api/models";

test('Render PartitionDetails component', () => {
    let partition = {
        id: "test",
        name: "test",
        enabled: true,
    } as PartitionViewModel;
    renderer.create(<PartitionDetails open={true} partition={partition} close={() => {}}/>);
});
