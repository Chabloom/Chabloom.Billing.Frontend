import React from 'react';
import renderer from 'react-test-renderer';
import Partitions from "./Partitions";

test('Render Partitions component', () => {
    renderer.create(<Partitions/>);
});
