'use server' // Enables the server-side functionality for Next.js App Router

import { db } from '@/db' // Importing the Prisma database instance
import type { Post } from '@prisma/client' // Importing the Post type from Prisma
import { revalidatePath } from 'next/cache' // Function to refresh cache after data changes
import { redirect } from 'next/navigation' // Redirect function for server-side navigation
import { z } from 'zod' // Importing Zod for schema validation

// Define a Zod schema for validating post data
const postSchema = z.object({
    title: z.string().min(3).max(255), // Title must be between 3 and 255 characters
    content: z.string().min(10).max(4000), // Content must be between 10 and 4000 characters
})

// Define an interface for form state handling errors
interface PostFormState {
    errors: {
        title?: string[],  // Array of error messages for title field
        content?: string[],  // Array of error messages for content field
        _form?: string[], // Generic errors not related to a specific field
    }
}

/**
 * Creates a new post in the database
 * @param formState - State object to store validation errors
 * @param formData - Form data containing title and content
 * @returns PostFormState - Errors if validation fails, otherwise redirects to homepage
 */
export async function createPost(
    formState: PostFormState,
    formData: FormData
): Promise<PostFormState> {
    // Validate the form data using the schema
    const result = postSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
    })

    // Return validation errors if any
    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    let post: Post
    try {
        // Create a new post in the database
        post = await db.post.create({
            data: {
                title: result.data.title,
                content: result.data.content,
            }
        })
    } catch (error: unknown) {
        // Handle database errors
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message],
                },
            }
        } else {
            return {
                errors: {
                    _form: ['Something went wrong'],
                },
            }
        }
    }

    // Refresh the cache and redirect to the homepage after successful creation
    revalidatePath('/')
    redirect('/')
}

/**
 * Updates an existing post in the database
 * @param id - ID of the post to update
 * @param formState - State object to store validation errors
 * @param formData - Form data containing title and content
 * @returns PostFormState - Errors if validation fails, otherwise redirects to homepage
 */
export async function updatePost(
    id: string,
    formState: PostFormState,
    formData: FormData
): Promise<PostFormState> {
    // Validate the form data using the schema
    const result = postSchema.safeParse({
        title: formData.get('title'),
        content: formData.get('content'),
    })

    // Return validation errors if any
    if (!result.success) {
        return {
            errors: result.error.flatten().fieldErrors
        }
    }

    let post: Post
    try {
        // Update the existing post in the database
        post = await db.post.update({
            where: { id },
            data: {
                title: result.data.title,
                content: result.data.content,
            }
        })
    } catch (error: unknown) {
        // Handle database errors
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message],
                },
            }
        } else {
            return {
                errors: {
                    _form: ['Something went wrong'],
                },
            }
        }
    }

    // Refresh the cache and redirect to the homepage after successful update
    revalidatePath('/')
    redirect('/')
}

/**
 * Deletes a post from the database
 * @param id - ID of the post to delete
 * @returns PostFormState - Errors if deletion fails, otherwise redirects to homepage
 */
export async function deletePost(
    id: string,
): Promise<PostFormState> {
    let post: Post
    try {
        // Delete the post from the database
        post = await db.post.delete({
            where: { id },
        })
    } catch (error: unknown) {
        // Handle database errors
        if (error instanceof Error) {
            return {
                errors: {
                    _form: [error.message],
                },
            }
        } else {
            return {
                errors: {
                    _form: ['Something went wrong'],
                },
            }
        }
    }

    // Refresh the cache and redirect to the homepage after successful deletion
    revalidatePath('/')
    redirect('/')
}
