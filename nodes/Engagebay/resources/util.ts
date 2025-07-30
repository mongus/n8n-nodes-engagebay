import { IExecuteFunctions, IHttpRequestOptions, INodeExecutionData } from 'n8n-workflow';

async function api(
	context: IExecuteFunctions,
	options: IHttpRequestOptions,
): Promise<INodeExecutionData> {
	if (!options?.headers?.Accept) {
		options.headers = {
			...options.headers,
			Accept: 'application/json',
		}
	}

	if (!options.json) {
		options.json = true;
	}

	if (options.url.startsWith('/')) {
		options.url = `https://app.engagebay.com${options.url}`;
	}

	const response = await context.helpers.httpRequestWithAuthentication.call(
		context,
		'engagebayCredentialsApi',
		options,
	);

	return { json: response };
}

export function get(context: IExecuteFunctions, url: string) {
	return api(context, { method: 'GET', url });
}
