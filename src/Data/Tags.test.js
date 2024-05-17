import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Tags from './Tags';

describe('Tags Component', () => {
  test('renders nothing when tags prop is not an array or is an empty array', () => {
    const { container } = render(<Tags tags={[]} />);
    expect(container).toBeEmptyDOMElement();

    const { container: container2 } = render(<Tags tags={null} />);
    expect(container2).toBeEmptyDOMElement();

    const { container: container3 } = render(<Tags tags={undefined} />);
    expect(container3).toBeEmptyDOMElement();
  });

  test('renders tags when tags prop is a non-empty array', () => {
    const tagsArray = ['React', 'JavaScript', 'CSS'];
    render(<Tags tags={tagsArray} />);

    tagsArray.forEach(tag => {
      expect(screen.getByText(tag)).toBeInTheDocument();
    });
  });

  test('renders correct number of tags', () => {
    const tagsArray = ['React', 'JavaScript', 'CSS'];
    render(<Tags tags={tagsArray} />);

    expect(screen.getAllByRole('listitem')).toHaveLength(tagsArray.length);
  });
});
