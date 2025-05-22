import React from 'react'; // Keep React import for JSX in tests themselves
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TimelinePostCard from './TimelinePostCard';

// Improved Mock for next/link to handle legacyBehavior and out-of-scope variables
jest.mock('next/link', () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function LinkMock({ children, href, legacyBehavior }: { children: React.ReactNode, href: string, legacyBehavior?: boolean }) {
    const ActualReact = require('react'); // Use require for React inside the factory

    if (legacyBehavior) {
      const child = ActualReact.Children.only(children);
      // Ensure child is a valid React element before trying to access its type or clone it.
      if (ActualReact.isValidElement(child)) {
        // Check if the child is an 'a' tag before cloning.
        // Accessing 'type' might be tricky if 'child' is a string or number.
        if ((child as React.ReactElement<any>).type === 'a') {
          return ActualReact.cloneElement(child as React.ReactElement<any>, { href });
        }
      }
      return child; // Return child as is if not an 'a' tag or not a valid element
    }
    // Default behavior (non-legacy) if legacyBehavior is not true
    return <a href={href}>{children}</a>;
  };
});

// Mock the Tag component as its actual implementation is not relevant to this unit test
jest.mock('./TagItem', () => ({
  Tag: jest.fn(({ text }) => <span data-testid="tag">{text}</span>),
}));


const mockPost = {
  title: 'Test Post Title',
  date: '2023-10-26T10:00:00.000Z', // ISO string for consistent date formatting
  tags: ['tag1', 'tag2'],
  description: 'This is a test post description.',
  slug: 'test-post-slug',
  cover: 'https://example.com/test-cover.jpg',
};

describe('TimelinePostCard', () => {
  test('renders basic post data correctly', () => {
    render(<TimelinePostCard post={mockPost} />);

    expect(screen.getByText(mockPost.title)).toBeInTheDocument();
    expect(screen.getByText('October 26, 2023')).toBeInTheDocument();
    expect(screen.getByText(mockPost.description)).toBeInTheDocument();
    
    const tagElements = screen.getAllByTestId('tag');
    mockPost.tags.forEach(tagText => {
      expect(tagElements.some(el => el.textContent === tagText)).toBe(true);
    });

    const readMoreLinkAnchor = screen.getByText('Read more →').closest('a');
    expect(readMoreLinkAnchor).toBeInTheDocument();
    expect(readMoreLinkAnchor).toHaveAttribute('href', `/posts/${mockPost.slug}`);
  });

  test('renders cover image when showCover is true and cover URL is provided', () => {
    render(<TimelinePostCard post={mockPost} showCover={true} />);
    const coverImage = screen.getByAltText(`${mockPost.title} cover image`);
    expect(coverImage).toBeInTheDocument();
    expect(coverImage).toHaveAttribute('src', mockPost.cover);
  });

  test('does not render cover image when showCover is false', () => {
    render(<TimelinePostCard post={mockPost} showCover={false} />);
    expect(screen.queryByAltText(`${mockPost.title} cover image`)).not.toBeInTheDocument();
  });

  test('does not render cover image when showCover is true but cover URL is missing', () => {
    const postWithoutCover = { ...mockPost, cover: undefined };
    render(<TimelinePostCard post={postWithoutCover} showCover={true} />);
    expect(screen.queryByAltText(`${postWithoutCover.title} cover image`)).not.toBeInTheDocument();
  });

  test('renders tags correctly and checks count', () => {
    render(<TimelinePostCard post={mockPost} />);
    const tagElements = screen.getAllByTestId('tag');
    expect(tagElements).toHaveLength(mockPost.tags.length);
    mockPost.tags.forEach(tagText => {
        expect(tagElements.some(el => el.textContent === tagText)).toBe(true);
    });
  });

  test('renders timeline-specific elements (dot and line)', () => {
    const { container } = render(<TimelinePostCard post={mockPost} />);
    const dotElement = container.querySelector('.bg-blue-600.rounded-full');
    expect(dotElement).toBeInTheDocument();

    const lineElement = container.querySelector('.bg-gray-300.w-1.flex-grow');
    expect(lineElement).toBeInTheDocument();
  });

  test('renders correctly without tags', () => {
    const postWithoutTags = { ...mockPost, tags: [] };
    render(<TimelinePostCard post={postWithoutTags} />);
    expect(screen.queryAllByTestId('tag')).toHaveLength(0);
  });

  test('renders correctly with one tag', () => {
    const postWithOneTag = { ...mockPost, tags: ['only-one'] };
    render(<TimelinePostCard post={postWithOneTag} />);
    const tagElements = screen.getAllByTestId('tag');
    expect(tagElements).toHaveLength(1);
    expect(tagElements[0]).toHaveTextContent('only-one');
  });
});
