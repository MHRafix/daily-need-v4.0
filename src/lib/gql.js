import { gql } from './api-client';

export const All_Products_Query = gql`
	query Products($orgUid: String!) {
		products(orgUID: $orgUid) {
			nodes {
				_id
				title
				thumbnail {
					bucket
					region
					key
					externalUrl
				}

				carouselImages {
					bucket
					region
					key
					externalUrl
				}
				gallery {
					bucket
					region
					key
					externalUrl
				}
				orgUID
				salePrice
				regularPrice
				createdAt
				updatedAt
			}
			meta {
				totalCount
				currentPage
				hasNextPage
				totalPages
			}
		}
	}
`;

export const Place_Order_Mutation = gql`
	mutation PlaceOrder($payload: CreateOrderInput!) {
		placeOrder(payload: $payload) {
			_id
		}
	}
`;
