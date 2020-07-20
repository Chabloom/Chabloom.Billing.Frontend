import React from 'react';
import renderer from 'react-test-renderer';
import AccountDetails from "./AccountDetails";
import {AccountViewModel} from "../../api/models";

test('Render AccountDetails component', () => {
    let account = {
        id: "test",
        name: "test",
        primaryAddress: "test",
        enabled: true,
        amount: 10.0,
        dayDue: 1,
        interval: 1,
    } as AccountViewModel;
    renderer.create(<AccountDetails open={true} account={account} close={() => {}}/>);
});
