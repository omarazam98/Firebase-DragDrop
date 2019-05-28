import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import renderer from 'react-test-renderer';
import UploadPage from './components/Upload';

it('renders App without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App/>, div);
  ReactDOM.unmountComponentAtNode(div);
});

jest.mock('./components/Upload', () => () => 'Upload');

test('UploadPage renders', () => {
  const component = renderer.create(
      <UploadPage/>,
  );
  let tree = component.toJSON();
  expect(tree).toMatchSnapshot();
});