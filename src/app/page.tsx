// Import the function to fetch posts from the database
import { fetchPosts } from "@/db/queries/posts";

// Import Next.js Link component for navigation
import Link from "next/link";

// Import PostDelete component for handling post deletion
import PostDelete from "@/components/post-delete";

// Define the Home component as an asynchronous function
export default async function Home() {
  // Fetch all posts from the database
  const posts = await fetchPosts();

  // Define date formatting options for displaying the updated date
  const dateOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  return (
    <main className="flex min-h-screen flex-col items-start p-24">
      {/* Create Post button at the top */}
      <div className="mb-4">
        <Link href="/posts/create" className="bg-white px-4 py-2 rounded">
          Create Post
        </Link>
      </div>

      {/* Grid container for displaying posts */}
      <div className="mb-32 grid gap-x-8 gap-y-4 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {/* Loop through the fetched posts and render each post */}
        {posts.map(post => {
          return (
            <div key={post.id}>
              <div className="mb-4">
                {/* Link to edit the post */}
                <Link
                  key={post.id}
                  href={`/posts/${post.id}/edit`}
                  className=""
                >
                  {/* Display the post title */}
                  <h2 className="mb-3 text-2xl font-semibold">
                    {post.title}
                  </h2>
                </Link>

                {/* Display the post content */}
                <p className="m-0 max-w-[30ch] text-sm opacity-60">
                  {post.content}
                </p>
              </div>

              {/* Display the post's last updated date */}
              <div className="text-sm opacity-30">
                {'Updated at ' + post.updatedAt.toLocaleDateString("en-US", dateOptions)}
              </div>

              {/* PostDelete component for deleting the post */}
              <PostDelete id={post.id} />
            </div>
          );
        })}
      </div>
    </main>
  );
}
