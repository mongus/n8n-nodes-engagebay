import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeProperties,
} from 'n8n-workflow';
import { get } from './util';

export const contactProperties: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'hidden',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['contact'],
			},
		},
		options: [
			{
				name: 'Get Contact by ID',
				value: 'getContactByID',
				action: 'Get contact by id',
			},
		],
		default: 'getContactByID',
	},
	{
		displayName: 'Contact ID',
		name: 'contactId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the contact to retrieve',
		displayOptions: {
			show: {
				operation: ['getContactByID'],
			},
		},
	},
];

export async function executeContactOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
	i: number,
): Promise<INodeExecutionData|void> {
	const operation = this.getNodeParameter('operation', i) as string;

	if (operation === 'getContactByID') {
		const contactId = this.getNodeParameter('contactId', i) as string;

		return await get(this, `https://app.engagebay.com/dev/api/panel/subscribers/${contactId}`);
	}
}
