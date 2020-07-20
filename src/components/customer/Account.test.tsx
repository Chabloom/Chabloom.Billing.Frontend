import React from 'react';
import renderer from 'react-test-renderer';
import Account from "./Account";

test('Render Account component', () => {
    renderer.create(<Account/>);
});
