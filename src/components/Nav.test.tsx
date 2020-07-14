import React from 'react';
import renderer from 'react-test-renderer';
import Nav from "./Nav";

test('Render Nav component', () => {
    renderer.create(<Nav/>);
});
