import React from 'react';
import renderer from 'react-test-renderer';
import Bill from "./Bill";

test('Render Bill component', () => {
    renderer.create(<Bill/>);
});
