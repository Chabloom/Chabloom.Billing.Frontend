import React from 'react';
import renderer from 'react-test-renderer';
import Accounts from "./Accounts";

test('Render Accounts component', () => {
    renderer.create(<Accounts/>);
});
