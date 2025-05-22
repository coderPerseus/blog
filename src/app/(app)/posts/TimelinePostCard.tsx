import Link from 'next/link';
// Assuming TagItem.tsx exists and exports Tag.
import { Tag } from './TagItem';

interface Post {
  title: string;
  date: string; // Should be a format parsable by new Date()
  tags: string[];
  description: string;
  slug: string;
  cover?: string; // Optional cover image URL
}

interface TimelinePostCardProps {
  post: Post;
  showCover?: boolean;
}

const TimelinePostCard: React.FC<TimelinePostCardProps> = ({ post, showCover }) => {
  const { title, date, tags, description, slug, cover } = post;

  // Format date for display
  const displayDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <div className="flex items-start my-10 relative group"> {/* Added group for potential future use */}
      {/* Timeline: Dot and Line */}
      <div className="flex flex-col items-center mr-6 rtl:mr-0 rtl:ml-6"> {/* RTL support for margin */}
        <div className="w-5 h-5 bg-blue-600 rounded-full shadow-lg z-10 border-2 border-white group-hover:bg-blue-700 transition-colors duration-200"></div>
        {/* The line should ideally connect dots; this setup implies one post. Adjust if part of a list where lines connect. */}
        <div className="w-1 flex-grow bg-gray-300" style={{ minHeight: 'calc(100% - 1.25rem)' }}></div> {/* Adjusted minHeight */}
      </div>

      {/* Card Content */}
      <div className="flex-1 bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 ease-in-out w-full">
        {/* Date */}
        <p className="text-md text-blue-700 mb-2 font-semibold tracking-wide uppercase">
          {displayDate}
        </p>

        {/* Title */}
        <Link href={`/posts/${slug}`} legacyBehavior>
          <a className="text-3xl font-bold text-gray-800 hover:text-blue-600 transition-colors duration-200 block mb-3">
            {title}
          </a>
        </Link>

        {/* Cover Image (Optional) */}
        {showCover && cover && (
          <div className="my-5 rounded-lg overflow-hidden shadow-lg">
            <img 
              src={cover} 
              alt={`${title} cover image`} 
              className="object-cover w-full h-56 sm:h-64 md:h-72 transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}

        {/* Description */}
        <p className="text-gray-700 leading-relaxed my-4 text-base">
          {description}
        </p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div className="mt-4 mb-5">
            {tags.map((tag) => (
              <Tag key={tag} text={tag} />
            ))}
          </div>
        )}

        {/* Read More Link */}
        <Link href={`/posts/${slug}`} legacyBehavior>
          <a className="inline-flex items-center bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium text-sm shadow-md hover:shadow-lg">
            Read more &rarr;
          </a>
        </Link>
      </div>
    </div>
  );
};

export default TimelinePostCard;
