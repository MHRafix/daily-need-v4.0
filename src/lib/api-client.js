export const gqlRequest = async (payload) => {
	const apiResponse = await fetch(
		`${process.env.NEXT_PUBLIC_ANALYTICS_BUSINESS_API_URL}/graphql`,
		{
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json',
				// Authorization: `Bearer ${StorageUtil.getItem('token')}`,
			},
			body: JSON.stringify({
				query: payload.query,
				variables: payload.variables,
			}),
		}
	);

	if (!apiResponse.ok) {
		throw new Error('Failed to fetch data');
	}

	const { data, errors } = await apiResponse.json();

	if (errors) {
		throw new Error(errors.map((e) => e.message).join(', '));
	}

	return data;
};

export const gql = String.raw;

// export const identityApi = axios.create({
// 	baseURL: import.meta.env.VITE_APP_IDENTITY_API_URL,
// 	headers: {
// 		'Content-Type': 'application/json',
// 		Accept: 'application/json',
// 		Authorization: `Bearer ${StorageUtil.getItem('token')}`,
// 	},
// });
