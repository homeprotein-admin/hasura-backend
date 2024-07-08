type RequestOptions = {
    query: string,
    operationName: string,
    variables?: Record<string, unknown>
}

export const requestGraphQL = async (options: RequestOptions) => {
    const res = await fetch(
        process.env.GRAPHQL_ENDPOINT as string,
        {
            method: "POST",
            body: JSON.stringify(options),
            headers: {
                "x-hasura-admin-secret": process.env.HASURA_ADMIN_SECRET as string
            }
        }
    );

    return res.json()
}