export type SeedResponse<T extends string> = {
    data: {
        [key in T]: {
            id: string
        }
    }
}

export const requestGQL = async (
    operation: string,
    operationName: string,

    variables?: Record<string, any>
) => {
    const res = await fetch('http://localhost:3008/v1/graphql', {
        method: 'POST',
        body: JSON.stringify({
            query: operation,
            operationName,
            variables: variables || {},
        }),
        headers: {
            "x-hasura-admin-secret": "hasurasecret"
        }
    })

    if(!res.ok) throw new Error(`Seeding ${operationName} failed!`)

    return res.json()
}