import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription, NodeConnectionType,
	NodeOperationError,
} from 'n8n-workflow';

import { AxiosError } from 'axios';

const OPERATIONS = {
	getContactByID: {
		url: (context: IExecuteFunctions, i: number) => {
			const contactId = context.getNodeParameter('contactId', i) as string;
			return `https://app.engagebay.com/dev/api/panel/subscribers/${contactId}`;
		},
	}
}

type OperationKey = keyof typeof OPERATIONS;

export class EngagebayContacts implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'EngageBay Contacts',
		name: 'engagebayContacts',
		icon: 'file:engagebay-icon.svg',
		group: ['transform'],
		version: 1,
		description: 'EngageBay Contacts API Integration',
		defaults: {
			name: 'EngageBay Contacts',
		},
		inputs: ['main'] as NodeConnectionType[],
		outputs: ['main'] as NodeConnectionType[],
		credentials: [
			{
				name: 'engagebayCredentialsApi',
				required: true,
			},
		],
		properties: [
			// Node properties which the user gets displayed and can change on the node
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Get Contact By ID',
						value: 'getContactByID',
						description: 'Get contact information by ID from EngageBay',
						action: 'Get contact information by ID',
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
						operation: [
							'getContactByID',
						],
					},
				},
			},
		],
	};

	// The function below is responsible for actually doing whatever this node
	// is supposed to do. It handles different operations like getting user profile,
	// getting owners, and getting contact by ID from the EngageBay API and returning the results.
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		// For each item, make an API call based on the selected operation
		for (let i = 0; i < items.length; i++) {
			const operation = this.getNodeParameter('operation', i) as OperationKey;

			const _url: string | ((context: IExecuteFunctions, i: number)=>string) = OPERATIONS[operation].url;
			const url = typeof _url === 'string' ? _url : _url(this, i);

			try {
				// Make HTTP request using built-in n8n functionality
				const response = await this.helpers.httpRequestWithAuthentication.call(this, 'engagebayCredentialsApi', {
					method: 'GET',
					url,
					headers: {
						'Accept': 'application/json',
					},
					json: true,
				});

				// Add the response data to the returned items
				returnData.push({
					json: response,
					pairedItem: {
						item: i,
					},
				});
			} catch (error) {
				// Handle errors
				if (error instanceof AxiosError) {
					throw new NodeOperationError(
						this.getNode(),
						`EngageBay API error: ${error.message}`,
						{ itemIndex: i },
					);
				}
				throw new NodeOperationError(this.getNode(), `Error: ${error}`, { itemIndex: i });
			}
		}

		return [returnData];
	}
}
