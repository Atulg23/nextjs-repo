// Import the Post type from Prisma, representing the structure of the "post" table
import type { Post } from '@prisma/client'

// Import the database instance from the local database configuration
import { db } from '@/db'

// Import the notFound function from Next.js to handle 404 errors
import { notFound } from 'next/navigation'

/**
 * Fetch all posts from the database, ordered by the last updated timestamp (descending order).
 * 
 * @returns {Promise<Post[]>} - A promise that resolves to an array of Post objects.
 */
export async function fetchPosts(): Promise<Post[]> {
    return await db.post.findMany({
        orderBy: [
            {
                updatedAt: 'desc', // Sort posts by updatedAt timestamp in descending order
            }
        ],
    })
}

/**
 * Fetch a single post by its ID.
 * 
 * @param {string} id - The unique identifier of the post.
 * @returns {Promise<Post | null>} - A promise that resolves to a Post object if found, otherwise null.
 */
export async function fetchPostById(id: string): Promise<Post | null> {
    // Attempt to find the first post that matches the given ID
    const post = await db.post.findFirst({
        where: {
            id // Find the post where the id matches the provided id
        }
    })

    // If no post is found, trigger a 404 Not Found response
    if (!post) {
        notFound() // Automatically redirects to a Next.js 404 page
    }

    return post // Return the found post or null if not found
}
