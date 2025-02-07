// Import necessary functions and components
import { updatePost } from "@/app/actions/posts"; // Function to update a post
import PostForm from "@/components/post-form"; // Component for handling post form
import { fetchPostById } from "@/db/queries/posts"; // Function to fetch a post by ID

// Define the interface for the component props
interface PostsEditProps {
    params: {
        id: string; // The post ID passed as a route parameter
    };
}

// Asynchronous component to edit a post
export default async function PostsEdit({ params }: PostsEditProps) {
    const { id } = params; // Extract post ID from the route parameters

    // Fetch the existing post details using the ID
    const post = await fetchPostById(id);

    // Bind the updatePost function with the post ID to be used as the form action
    const updateAction = updatePost.bind(null, id);

    return (
        <main className="flex min-h-screen flex-col items-start p-24">
            <div className="mb-32 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
                {/* Render the PostForm component with initial data and update action */}
                <PostForm 
                    formAction={updateAction} 
                    initialData={{ 
                        title: post?.title ?? '', // Set title if available, otherwise empty
                        content: post?.content ?? '' // Set content if available, otherwise empty
                    }} 
                />
            </div>
        </main>
    );
}
