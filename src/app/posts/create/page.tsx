// Import the function to create a new post
import { createPost } from "@/app/actions/posts";

// Import the PostForm component used for creating and editing posts
import PostForm from "@/components/post-form";

// Component for creating a new post
export default function PostsCreate() {
    return (
        <main className="flex min-h-screen flex-col items-start p-24">
            <div className="mb-32 text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
                {/* Render the PostForm component with default empty values */}
                {/* The form will use createPost as the action when submitted */}
                <PostForm 
                    formAction={createPost} 
                    initialData={{ 
                        title: '',   // Default empty title for new posts
                        content: ''  // Default empty content for new posts
                    }} 
                />
            </div>
        </main>
    );
}
