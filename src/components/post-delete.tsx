// 'use client' directive ensures this component runs in the client-side environment
'use client'

// Import the deletePost function from the actions folder
import { deletePost } from "@/app/actions/posts";

// Define the interface for component props, expecting a post ID
interface PostDeleteProps {
    id: string,  // ID of the post to be deleted
}

// Define the PostDelete component as the default export
export default function PostDelete({ id }: PostDeleteProps) {
    // Function to handle the delete action when the form is submitted
    const deleteAction = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();  // Prevent the default form submission behavior
        deletePost(id);  // Call the deletePost function with the post ID
    };

    return (
        // Form element to handle post deletion
        <form onSubmit={deleteAction}>
            {/* Delete button with styling for visibility */}
            <button type="submit" className="text-sm opacity-30 text-red-500">
                Delete
            </button>
        </form>
    );
}
