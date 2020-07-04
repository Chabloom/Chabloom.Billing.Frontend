import React from 'react';
import renderer from 'react-test-renderer';
import Profile from "./Profile";

test('Render Profile component', () => {
    renderer.create(<Profile/>);
});
