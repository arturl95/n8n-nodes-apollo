import { INodeProperties } from 'n8n-workflow';

export const opportunityOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Create Deal',
				value: 'create',
				description: 'Create a new deal (opportunity) in Apollo',
				action: 'Create a deal',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/opportunities',
						body: `={{ {
							name: $parameter.name,
							owner_id: $parameter.owner_id,
							account_id: $parameter.account_id,
							amount: $parameter.amount,
							opportunity_stage_id: $parameter.opportunity_stage_id,
							closed_date: $parameter.closed_date,
						} }}`,
					},
				},
			},
			{
				name: 'List Deals',
				value: 'list',
				description: 'List all deals in your Apollo workspace',
				action: 'List deals',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v1/opportunities/search',
					},
				},
			},
			{
				name: 'View Deal',
				value: 'view',
				description: 'Retrieve a single deal by ID',
				action: 'View a deal',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/v1/opportunities/" + $parameter.opportunity_id }}',
					},
				},
			},
			{
				name: 'Update Deal',
				value: 'update',
				description: 'Update fields on an existing deal',
				action: 'Update a deal',
				routing: {
					request: {
						method: 'PATCH',
						url: '={{ "/api/v1/opportunities/" + $parameter.opportunity_id }}',
						body: `={{ {
							owner_id: $parameter.owner_id,
							name: $parameter.name,
							amount: $parameter.amount,
							opportunity_stage_id: $parameter.opportunity_stage_id,
							closed_date: $parameter.closed_date,
							is_closed: $parameter.is_closed,
							is_won: $parameter.is_won,
							source: $parameter.source,
							account_id: $parameter.account_id,
						} }}`,
					},
				},
			},
		],
		default: 'create',
		displayOptions: {
			show: {
				resource: ['opportunity'],
			},
		},
	},
];

export const opportunityFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                               opportunity:view                              */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Opportunity ID',
		name: 'opportunity_id',
		type: 'string',
		default: '',
		description: 'The Apollo deal ID to view/update',
		required: true,
		displayOptions: {
			show: {
				resource: ['opportunity'],
				operation: ['view', 'update'],
			},
		},
	},

	/* -------------------------------------------------------------------------- */
	/*                               opportunity:create                            */
	/*                               opportunity:update                            */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Name',
		name: 'name',
		type: 'string',
		default: '',
		description: 'Human-readable deal name',
		displayOptions: {
			show: {
				resource: ['opportunity'],
				operation: ['create', 'update'],
			},
		},
	},
	{
		displayName: 'Owner ID',
		name: 'owner_id',
		type: 'string',
		default: '',
		description: 'Apollo user ID for the deal owner',
		displayOptions: {
			show: {
				resource: ['opportunity'],
				operation: ['create', 'update'],
			},
		},
	},
	{
		displayName: 'Account ID',
		name: 'account_id',
		type: 'string',
		default: '',
		description: 'Apollo Account ID associated with the deal',
		displayOptions: {
			show: {
				resource: ['opportunity'],
				operation: ['create', 'update'],
			},
		},
	},
	{
		displayName: 'Amount',
		name: 'amount',
		type: 'string',
		default: '',
		description: 'Monetary value without commas or currency symbols (e.g. 55123478)',
		displayOptions: {
			show: {
				resource: ['opportunity'],
				operation: ['create', 'update'],
			},
		},
	},
	{
		displayName: 'Stage ID',
		name: 'opportunity_stage_id',
		type: 'string',
		default: '',
		description: 'Apollo Deal Stage ID',
		displayOptions: {
			show: {
				resource: ['opportunity'],
				operation: ['create', 'update'],
			},
		},
	},
	{
		displayName: 'Closed Date',
		name: 'closed_date',
		type: 'string',
		default: '',
		placeholder: 'YYYY-MM-DD',
		description: 'Estimated close date in YYYY-MM-DD format',
		displayOptions: {
			show: {
				resource: ['opportunity'],
				operation: ['create', 'update'],
			},
		},
	},
	{
		displayName: 'Is Closed',
		name: 'is_closed',
		type: 'boolean',
		default: false,
		description: 'Whether the deal is closed',
		displayOptions: {
			show: {
				resource: ['opportunity'],
				operation: ['update'],
			},
		},
	},
	{
		displayName: 'Is Won',
		name: 'is_won',
		type: 'boolean',
		default: false,
		description: 'Whether the deal is won',
		displayOptions: {
			show: {
				resource: ['opportunity'],
				operation: ['update'],
			},
		},
	},
	{
		displayName: 'Source',
		name: 'source',
		type: 'string',
		default: '',
		description: 'Source of the deal (defaults to api when created via API)',
		displayOptions: {
			show: {
				resource: ['opportunity'],
				operation: ['update'],
			},
		},
	},

	/* -------------------------------------------------------------------------- */
	/*                               opportunity:list                              */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Sort By Field',
		name: 'sort_by_field',
		type: 'options',
		default: 'amount',
		description: 'How to sort returned deals',
		options: [
			{ name: 'Amount', value: 'amount' },
			{ name: 'Is Closed', value: 'is_closed' },
			{ name: 'Is Won', value: 'is_won' },
		],
		routing: {
			send: {
				property: 'sort_by_field',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['opportunity'],
				operation: ['list'],
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
				resource: ['opportunity'],
				operation: ['list'],
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
				resource: ['opportunity'],
				operation: ['list'],
			},
		},
	},
];
