import { INodeProperties } from 'n8n-workflow';

export const accountOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Search Accounts',
				value: 'search',
				description: 'Search accounts in your Apollo workspace',
				action: 'Search accounts',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/accounts/search',
					},
				},
			},
		],
		default: 'search',
		displayOptions: {
			show: {
				resource: ['account'],
			},
		},
	},
];

export const accountFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                               account:search                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Company Name Keywords',
		name: 'q_organization_name',
		type: 'string',
		default: '',
		description: 'Keywords that must match part of the account name',
		routing: {
			send: {
				property: 'q_organization_name',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Account Stage IDs',
		name: 'account_stage_ids',
		type: 'fixedCollection',
		default: {},
		description: 'Apollo account stage IDs to include',
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'stage',
				displayName: 'Stage',
				values: [
					{
						displayName: 'Stage ID',
						name: 'value',
						type: 'string',
						default: '',
						routing: {
							send: {
								property: 'account_stage_ids[]',
								type: 'query',
							},
						},
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Sort By Field',
		name: 'sort_by_field',
		type: 'options',
		default: 'account_last_activity_date',
		description: 'How to sort the matching accounts',
		options: [
			{ name: 'Account Last Activity Date', value: 'account_last_activity_date' },
			{ name: 'Account Created At', value: 'account_created_at' },
			{ name: 'Account Updated At', value: 'account_updated_at' },
		],
		routing: {
			send: {
				property: 'sort_by_field',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Sort Ascending',
		name: 'sort_ascending',
		type: 'boolean',
		default: false,
		description: 'Whether to sort ascending (requires Sort By Field)',
		routing: {
			send: {
				property: 'sort_ascending',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		default: 1,
		routing: {
			send: {
				property: 'page',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Per Page',
		name: 'per_page',
		type: 'number',
		default: 10,
		routing: {
			send: {
				property: 'per_page',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['account'],
				operation: ['search'],
			},
		},
	},
];
