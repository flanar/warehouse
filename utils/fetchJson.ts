class FetchError extends Error {
    response: Response | null
    data: any
    constructor(message: string) {
        super(message)
        this.response = null
        this.data = null
    }
}

export default async function fetcher(input: RequestInfo, init?: RequestInit | undefined) {
    try {
        const response = await fetch(input, init)
        const data = await response.json()

        if(response.ok) {
            return data
        }

        const error = new FetchError(response.statusText)
        error.response = response
        error.data = data
        throw error
    } catch (error) {
        if(!error.data) {
            error.data = { message: error.message }
        }
        throw error
    }
}