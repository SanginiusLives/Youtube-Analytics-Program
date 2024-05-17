import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { BrowserRouter as Router, createMemoryHistory } from 'react-router-dom';
import { Router as CustomRouter } from 'react-router-dom';
import Header from './Header';

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

describe('Header Component', () => {
  test('renders header and Form component', () => {
    render(
      <Router>
        <Header />
      </Router>
    );

    expect(screen.getByText('Youtube Video Analytics')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Video ID')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  test('navigates to the root URL when clicking on the header link', () => {
    const history = createMemoryHistory();
    render(
      <CustomRouter history={history}>
        <Header />
      </CustomRouter>
    );

    fireEvent.click(screen.getByText('Youtube Video Analytics'));
    expect(history.location.pathname).toBe('/');
  });

  test('navigates to the correct URL on form submit', () => {
    const history = createMemoryHistory();
    render(
      <CustomRouter history={history}>
        <Header />
      </CustomRouter>
    );

    fireEvent.change(screen.getByPlaceholderText('Video ID'), { target: { value: 'https://www.youtube.com/watch?v=testVideoId' } });
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));

    expect(history.location.pathname).toBe('/testVideoId');
  });
});