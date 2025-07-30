import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeConnectionType, NodeOperationError,
} from 'n8n-workflow';

import { properties, executeOperation } from './resources';
import { AxiosError } from 'axios';

// const subtitle = `={{ ( { ${Object.entries(properties.reduce((acc, prop) => {
// 	if (prop.name === 'operation') {
// 		prop.options?.forEach(option => {
// 			const value = (option as INodePropertyOptions).value;
// 			if (value)
// 				acc[String(value)] = option.name;
// 		});
// 	}
//
// 	return acc;
// }, {} as {[operation: string]: string }))
// 	.map(([key, value]) => `"${key}": "${value}"`)
// 	.join(', ') } } )[$parameter["operation"]] }}`;

export class Engagebay implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'EngageBay',
		name: 'engagebay',
		icon: 'file:engagebay.svg',
		group: ['transform'],
		version: 1,
		subtitle: '',//: '={{ $parameter["operation"] + ": " + $parameter["resource"] }}',
		description: 'EngageBay API Integration',
		defaults: {
			name: 'EngageBay',
		},
		inputs: ['main'] as NodeConnectionType[],
		outputs: ['main'] as NodeConnectionType[],
		outputNames: ['data'],
		credentials: [
			{
				name: 'engagebayCredentialsApi',
				required: true,
			},
		],
		properties,
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		for (let i = 0; i < items.length; i++) {
			try {
				const result = await executeOperation.call(this, items, i);

				if (result) {
					returnData.push(result);
				}
				else {
					throw new NodeOperationError(this.getNode(), 'No data returned from operation', {
						itemIndex: i,
					});
				}
			} catch (error) {
				if (this.continueOnFail()) {
					returnData.push({ json: { error: error.message } });
					continue;
				}

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
