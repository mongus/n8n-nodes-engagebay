import { IExecuteFunctions, INodeExecutionData, INodeProperties } from 'n8n-workflow';
import { commonProperties } from './common';
import { contactProperties, executeContactOperations } from './contact';
import { trackProperties, executeTrackOperations } from './track';
import { userProperties, executeUserOperations } from './user';

export const properties: INodeProperties[] = [
	...commonProperties,
	...contactProperties,
	...trackProperties,
	...userProperties,
];

export async function executeOperation(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
	i: number,
): Promise<INodeExecutionData|void> {
	const resource = this.getNodeParameter('resource', i) as string;

	switch (resource) {
		case 'contact': return await executeContactOperations.call(this, items, i);
		case 'track': return await executeTrackOperations.call(this, items, i);
		case 'user': return await executeUserOperations.call(this, items, i);
	}

	return Promise.reject(new Error(`The resource "${resource}" is not supported.`));
}
