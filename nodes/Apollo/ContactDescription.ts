import { INodeProperties } from 'n8n-workflow';

export const contactOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Create Contact',
				value: 'create',
				description: 'Create a new contact in Apollo',
				action: 'Create a contact',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/contacts',
						body: `={{ {
							first_name: $parameter.first_name,
							last_name: $parameter.last_name,
							organization_name: $parameter.organization_name,
							title: $parameter.title,
							account_id: $parameter.account_id,
							email: $parameter.email,
							website_url: $parameter.website_url,
							label_names: ((($parameter.label_names || {}).label || []).map(l => l.value)).filter(Boolean),
							contact_stage_id: $parameter.contact_stage_id,
							present_raw_address: $parameter.present_raw_address,
							direct_phone: $parameter.direct_phone,
							corporate_phone: $parameter.corporate_phone,
							mobile_phone: $parameter.mobile_phone,
							home_phone: $parameter.home_phone,
							other_phone: $parameter.other_phone,
							typed_custom_fields: JSON.parse($parameter.typed_custom_fields || "{}"),
						} }}`,
					},
				},
			},
			{
				name: 'Update Contact',
				value: 'update',
				description: 'Update an existing contact by ID',
				action: 'Update a contact',
				routing: {
					request: {
						method: 'PUT',
						url: '={{ "/api/v1/contacts/" + $parameter.contact_id }}',
						body: `={{ {
							first_name: $parameter.first_name,
							last_name: $parameter.last_name,
							organization_name: $parameter.organization_name,
							title: $parameter.title,
							account_id: $parameter.account_id,
							email: $parameter.email,
							website_url: $parameter.website_url,
							label_names: ((($parameter.label_names || {}).label || []).map(l => l.value)).filter(Boolean),
							contact_stage_id: $parameter.contact_stage_id,
							present_raw_address: $parameter.present_raw_address,
							direct_phone: $parameter.direct_phone,
							corporate_phone: $parameter.corporate_phone,
							mobile_phone: $parameter.mobile_phone,
							home_phone: $parameter.home_phone,
							other_phone: $parameter.other_phone,
							typed_custom_fields: JSON.parse($parameter.typed_custom_fields || "{}"),
						} }}`,
					},
				},
			},
		],
		default: 'create',
		displayOptions: {
			show: {
				resource: ['contact'],
			},
		},
	},
];

export const contactFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                               contact:update                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Contact ID',
		name: 'contact_id',
		type: 'string',
		default: '',
		description: 'The Apollo contact ID to update',
		required: true,
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['update'],
			},
		},
	},

	/* -------------------------------------------------------------------------- */
	/*                               contact:create                               */
	/*                               contact:update                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'First Name',
		name: 'first_name',
		type: 'string',
		default: '',
		description: 'First name of the contact',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['create', 'update'],
			},
		},
	},
	{
		displayName: 'Last Name',
		name: 'last_name',
		type: 'string',
		default: '',
		description: 'Last name of the contact',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['create', 'update'],
			},
		},
	},
	{
		displayName: 'Organization Name',
		name: 'organization_name',
		type: 'string',
		default: '',
		description: "The contact's employer company name",
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['create', 'update'],
			},
		},
	},
	{
		displayName: 'Title',
		name: 'title',
		type: 'string',
		default: '',
		description: 'Current job title',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['create', 'update'],
			},
		},
	},
	{
		displayName: 'Account ID',
		name: 'account_id',
		type: 'string',
		default: '',
		description: 'Apollo Account ID for the contact (account in your workspace)',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['create', 'update'],
			},
		},
	},
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		default: '',
		placeholder: 'name@email.com',
		description: 'Contact email address',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['create', 'update'],
			},
		},
	},
	{
		displayName: 'Website URL',
		name: 'website_url',
		type: 'string',
		default: '',
		description: 'Corporate website URL',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['create', 'update'],
			},
		},
	},
	{
		displayName: 'Labels',
		name: 'label_names',
		type: 'fixedCollection',
		default: {},
		description: 'Lists to which this contact belongs',
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'label',
				displayName: 'Label',
				values: [
					{
						displayName: 'Label',
						name: 'value',
						type: 'string',
						default: '',
						// Note: Request body is built at operation-level to convert this into an array
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['create', 'update'],
			},
		},
	},
	{
		displayName: 'Contact Stage ID',
		name: 'contact_stage_id',
		type: 'string',
		default: '',
		description: 'Apollo ID for the contact stage',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['create', 'update'],
			},
		},
	},
	{
		displayName: 'Personal Location',
		name: 'present_raw_address',
		type: 'string',
		default: '',
		description: 'Personal location (e.g. "Atlanta, United States")',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['create', 'update'],
			},
		},
	},
	{
		displayName: 'Direct Phone',
		name: 'direct_phone',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['create', 'update'],
			},
		},
	},
	{
		displayName: 'Corporate Phone',
		name: 'corporate_phone',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['create', 'update'],
			},
		},
	},
	{
		displayName: 'Mobile Phone',
		name: 'mobile_phone',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['create', 'update'],
			},
		},
	},
	{
		displayName: 'Home Phone',
		name: 'home_phone',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['create', 'update'],
			},
		},
	},
	{
		displayName: 'Other Phone',
		name: 'other_phone',
		type: 'string',
		default: '',
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['create', 'update'],
			},
		},
	},
	{
		displayName: 'Typed Custom Fields (JSON)',
		name: 'typed_custom_fields',
		type: 'string',
		default: '{}',
		description:
			'JSON object where keys are custom field IDs and values are inputs (e.g. {"60c39...": "2025-08-07"}). Use the Custom Fields API to discover IDs.',
		typeOptions: {
			rows: 4,
		},
		displayOptions: {
			show: {
				resource: ['contact'],
				operation: ['create', 'update'],
			},
		},
	},
];
