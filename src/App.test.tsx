import React from 'react';
import renderer from 'react-test-renderer';
import App from "./App";

test('Render App component', () => {
    renderer.create(<App/>);
});
