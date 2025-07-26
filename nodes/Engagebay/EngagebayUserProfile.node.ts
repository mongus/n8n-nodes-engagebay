import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription, NodeConnectionType,
	NodeOperationError,
} from 'n8n-workflow';

import { AxiosError } from 'axios';

export class EngagebayUserProfile implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'EngageBay User Profile',
		name: 'engagebayUserProfile',
		icon: 'file:engagebay-icon.svg',
		group: ['transform'],
		version: 1,
		description: 'EngageBay User Profile API Integration',
		defaults: {
			name: 'EngageBay User Profile',
		},
		inputs: ['main'] as NodeConnectionType[],
		outputs: ['main'] as NodeConnectionType[],
		credentials: [
			{
				name: 'engagebayCredentialsApi',
				required: true,
			},
		],
		properties: [],
	};

	// The function below is responsible for actually doing whatever this node
	// is supposed to do. It handles different operations like getting user profile,
	// getting owners, and getting contact by ID from the EngageBay API and returning the results.
	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		// For each item, make an API call based on the selected operation
		for (let i = 0; i < items.length; i++) {
			try {
				// Make HTTP request using built-in n8n functionality
				const response = await this.helpers.httpRequestWithAuthentication.call(this, 'engagebayCredentialsApi', {
					method: 'GET',
					url: 'https://app.engagebay.com/dev/api/panel/users/profile/user-info',
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
