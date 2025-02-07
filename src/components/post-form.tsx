// 'use client' directive ensures this component runs in the client-side environment
'use client'

// Import necessary dependencies
import Link from "next/link"
import { useFormState } from "react-dom"

// Define an interface to represent form validation errors
interface FormErrors {
    title?: string[],  // Array of error messages for the "title" field
    content?: string[], // Array of error messages for the "content" field
}

// Define the overall form state structure
interface FormState {
    errors: FormErrors, // Holds validation errors for the form fields
}

// Define the props that the PostForm component accepts
interface PostFormProps {
    formAction: any, // Function to handle form submission
    initialData: {
        title: string,  // Initial title of the post (empty for new posts)
        content: string, // Initial content of the post (empty for new posts)
    },
}

// The PostForm component is responsible for handling post creation and updates
export default function PostForm({ formAction, initialData }: PostFormProps) {
    // useFormState hook to manage the form state and handle validation errors
    const [formState, action] = useFormState<FormState>(formAction, {
        errors: {}, // Initialize with an empty error object
    })

    return (
        <>
            {/* Heading dynamically changes based on whether it's a new or updated post */}
            <h1 className="text-3xl font-bold mb-6">
                {initialData.title ? 'Update' : 'Create'} Post
            </h1>

            {/* Form submission triggers the provided formAction function */}
            <form action={action}>
                <div className="w-96">
                    {/* Title input field */}
                    <div className="mb-4">
                        <label htmlFor="title" className="block mb-2">Title</label>
                        <input
                            type="text"
                            id="title"
                            name="title"
                            defaultValue={initialData.title} // Prefill with existing title if editing
                            className="rounded p-2 w-full"
                        />
                        {/* Display validation errors for the title field if any */}
                        {
                            formState.errors.title &&
                            <div className="text-red-500">
                                {formState.errors.title?.join(', ')}
                            </div>
                        }
                    </div>

                    {/* Content input field */}
                    <div className="mb-4">
                        <label htmlFor="content" className="block mb-2">Content</label>
                        <textarea
                            id="content"
                            name="content"
                            defaultValue={initialData.content} // Prefill with existing content if editing
                            className="rounded p-2 w-full"
                        ></textarea>
                        {/* Display validation errors for the content field if any */}
                        {
                            formState.errors.content &&
                            <div className="text-red-500">
                                {formState.errors.content?.join(', ')}
                            </div>
                        }
                    </div>

                    {/* Form actions: Submit button and Cancel link */}
                    <div className="mb-4">
                        {/* Save button submits the form */}
                        <button type="submit" className="bg-white px-4 py-2 rounded mr-2">Save</button>
                        {/* Cancel button redirects back to the home page */}
                        <Link href="/" className="bg-transparent px-4 py-2 rounded">Cancel</Link>
                    </div>
                </div>
            </form>
        </>
    )
}
