const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"

export async function fetcher<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${API_URL}${endpoint}`, {
        headers: {
            "Content-Type": "application/json",
            ...(options?.headers || {})
        },
        ...options
    })

    if (!response.ok) {
        throw new Error(await response.text());
    }

    return response.json();
}