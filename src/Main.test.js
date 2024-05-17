import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Router as CustomRouter } from 'react-router-dom';
import Main from './Main';

// Mock the Form component
jest.mock('./Form', () => ({ handleFormSubmit }) => (
  <div>
    <form onSubmit={(e) => {
      e.preventDefault();
      handleFormSubmit('testVideoId');
    }}>
      <input placeholder="Video ID" type="text" />
      <button type="submit">Submit</button>
    </form>
  </div>
));

describe('Main Component', () => {
  test('renders header and Form component', () => {
    render(
      <Router>
        <Main />
      </Router>
    );

    expect(screen.getByText('Enter A Youtube Video Link And See Its Stats!')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Video ID')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('navigates to the correct URL on form submit', () => {
    const history = createMemoryHistory();
    render(
      <CustomRouter history={history}>
        <Main />
      </CustomRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Video ID'), { target: { value: 'https://www.youtube.com/watch?v=testVideoId' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(history.location.pathname).toBe('/testVideoId');
  });
});
