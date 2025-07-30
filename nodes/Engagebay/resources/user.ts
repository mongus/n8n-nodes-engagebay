import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeProperties,
} from 'n8n-workflow';
import { get } from './util';

export const userProperties: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'hidden',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['user'],
			},
		},
		options: [
			{
				name: 'Get Owners',
				value: 'getOwners',
				action: 'Get owners',
			},
			{
				name: 'Get User Profile',
				value: 'getUserProfile',
				action: 'Get user profile',
			},
		],
		default: 'getAllTracks',
	},
];

export async function executeUserOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
	i: number,
): Promise<INodeExecutionData|void> {
	const operation = this.getNodeParameter('operation', i) as string;

	if (operation === 'getOwners') {
		return get(this, '/dev/api/panel/users');
	} else if (operation === 'getUserProfile') {
		return get(this, `/dev/api/panel/users/profile/user-info`);
	}
}
