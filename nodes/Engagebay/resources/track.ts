import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeProperties,
} from 'n8n-workflow';
import { get } from './util';

export const trackProperties: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'hidden',
		noDataExpression: true,
		displayOptions: {
			show: {
				resource: ['track'],
			},
		},
		options: [
			{
				name: 'Get All Tracks',
				value: 'getAllTracks',
				action: 'Get all tracks',
			},
			{
				name: 'Get Track by ID',
				value: 'getTrackByID',
				action: 'Get track by id',
			},
		],
		default: 'getAllTracks',
	},
	{
		displayName: 'Track ID',
		name: 'trackId',
		type: 'string',
		required: true,
		default: '',
		description: 'The ID of the track to retrieve',
		displayOptions: {
			show: {
				operation: [
					'getTrackByID',
				],
			},
		},
	},
];

export async function executeTrackOperations(
	this: IExecuteFunctions,
	items: INodeExecutionData[],
	i: number,
): Promise<INodeExecutionData|void> {
	const operation = this.getNodeParameter('operation', i) as string;

	if (operation === 'getAllTracks') {
		return get(this, '/dev/api/panel/tracks');
	} else if (operation === 'getTrackByID') {
		const trackId = this.getNodeParameter('trackId', i) as string;
		return get(this, `/dev/api/panel/tracks/${trackId}`);
	}
}
