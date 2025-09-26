import { INodeType, INodeTypeDescription, NodeConnectionType } from 'n8n-workflow';
import { peopleFields, peopleOperations } from './PeopleDescription';
import { organizationFields, organizationOperations } from './OrganizationDescription';
import { contactFields, contactOperations } from './ContactDescription';
import { accountFields, accountOperations } from './AccountDescription';

export class Apollo implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Apollo',
		name: 'apollo',
		group: ['transform'],
		version: 1,
		subtitle: '={{$parameter["operation"] + ": " + $parameter["resource"]}}',
		description: 'Interact with Apollo API',
		icon: 'file:apollo.svg',
		defaults: {
			name: 'Apollo',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		usableAsTool: true,
		credentials: [
			{
				name: 'apolloApi',
				required: true,
			},
		],
		requestDefaults: {
			baseURL: '={{ $credentials.baseUrl || "https://api.apollo.io" }}',
			url: '',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		},
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Person',
						value: 'person',
					},
					{
						name: 'Organization',
						value: 'organization',
					},
					{
						name: 'Contact',
						value: 'contact',
					},
					{
						name: 'Account',
						value: 'account',
					},
				],
				default: 'person',
			},
		
			...peopleOperations,
			...peopleFields,
			...organizationOperations,
			...organizationFields,
			...contactOperations,
			...contactFields,
			...accountOperations,
			...accountFields,
		],
	};
}
