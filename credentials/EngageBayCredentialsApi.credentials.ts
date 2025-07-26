import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class EngageBayCredentialsApi implements ICredentialType {
	name = 'engagebayCredentialsApi';
	displayName = 'EngageBay Credentials API';

	documentationUrl = 'https://github.com/mongus/n8n-nodes-engagebay';

	properties: INodeProperties[] = [
		// The credentials to get from user and save encrypted.
		// Properties can be defined exactly in the same way
		// as node properties.
		{
			displayName: 'EngageBay Instance URL',
			name: 'url',
			type: 'string',
			default: '',
		},
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
		},
	];

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{$credentials.apiKey}}',
			},
		},
	};

	// The block below tells how this credential can be tested
	test: ICredentialTestRequest = {
		request: {
			baseURL: 'https://app.engagebay.com',
			url: '/dev/api/panel/users/profile/user-info',
		},
	};
}
