import { INodeProperties } from 'n8n-workflow';

export const commonProperties: INodeProperties[] = [
	{
		displayName: 'Resources',
		name: 'resource',
		type: 'hidden',
		noDataExpression: true,
		options: [
			{
				name: 'Contact',
				value: 'contact',
			},
			{
				name: 'Track',
				value: 'track',
			},
			{
				name: 'User',
				value: 'user',
			},
		],
		default: 'contact',
	},
];
