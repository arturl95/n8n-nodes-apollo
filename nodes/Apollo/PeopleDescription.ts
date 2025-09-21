import { INodeProperties } from 'n8n-workflow';

export const peopleOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Enrich Person',
				value: 'enrich',
				description: 'Enrich data for a single person',
				action: 'Enrich a person',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/people/match',
					},
				},
			},
			{
				name: 'Search People',
				value: 'search',
				description: 'Find people using filters',
				action: 'Search people',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/mixed_people/search',
					},
				},
			},
			{
				name: 'Bulk Enrich People',
				value: 'bulkEnrich',
				description: 'Enrich data for up to 10 people',
				action: 'Bulk enrich people',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/people/bulk_match',
						body: '={{ { details: JSON.parse($parameter.detailsJson || "[]") } }}',
					},
				},
			},
		],
		default: 'enrich',
		displayOptions: {
			show: {
				resource: ['person'],
			},
		},
	},
	/* -------------------------------------------------------------------------- */
	/*                               person:search                                */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Job Titles',
		name: 'person_titles',
		type: 'fixedCollection',
		default: {},
		description: 'Job titles to include (person must match any)',
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'title',
				displayName: 'Title',
				values: [
					{
						displayName: 'Title',
						name: 'value',
						type: 'string',
						default: '',
						routing: {
							send: {
								property: 'person_titles[]',
								type: 'query',
							},
						},
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Include Similar Titles',
		name: 'include_similar_titles',
		type: 'boolean',
		default: true,
		description: 'Whether to include people with similar job titles to those listed',
		routing: {
			send: {
				property: 'include_similar_titles',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Keywords',
		name: 'q_keywords',
		type: 'string',
		default: '',
		description: 'A string of words to filter results on',
		routing: {
			send: {
				property: 'q_keywords',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Person Locations',
		name: 'person_locations',
		type: 'fixedCollection',
		default: {},
		description: 'Cities, states, or countries where people live',
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'location',
				displayName: 'Location',
				values: [
					{
						displayName: 'Location',
						name: 'value',
						type: 'string',
						default: '',
						routing: {
							send: {
								property: 'person_locations[]',
								type: 'query',
							},
						},
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Person Seniorities',
		name: 'person_seniorities',
		type: 'fixedCollection',
		default: {},
		description: 'Job seniority at current employer',
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'seniority',
				displayName: 'Seniority',
				values: [
					{
						displayName: 'Seniority',
						name: 'value',
						type: 'string',
						default: '',
						routing: {
							send: {
								property: 'person_seniorities[]',
								type: 'query',
							},
						},
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Organization Locations',
		name: 'organization_locations',
		type: 'fixedCollection',
		default: {},
		description: "Company HQ locations (city, state, or country)",
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'orgLocation',
				displayName: 'Location',
				values: [
					{
						displayName: 'Location',
						name: 'value',
						type: 'string',
						default: '',
						routing: {
							send: {
								property: 'organization_locations[]',
								type: 'query',
							},
						},
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Organization Domains',
		name: 'q_organization_domains_list',
		type: 'fixedCollection',
		default: {},
		description: "Employer domains (e.g. apollo.io)",
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'domain',
				displayName: 'Domain',
				values: [
					{
						displayName: 'Domain',
						name: 'value',
						type: 'string',
						default: '',
						routing: {
							send: {
								property: 'q_organization_domains_list[]',
								type: 'query',
							},
						},
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Contact Email Statuses',
		name: 'contact_email_status',
		type: 'fixedCollection',
		default: {},
		description: 'Email status to filter by (verified, unverified, likely to engage, unavailable)',
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'status',
				displayName: 'Status',
				values: [
					{
						displayName: 'Status',
						name: 'value',
						type: 'string',
						default: '',
						routing: {
							send: {
								property: 'contact_email_status[]',
								type: 'query',
							},
						},
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Organization IDs',
		name: 'organization_ids',
		type: 'fixedCollection',
		default: {},
		description: 'Apollo organization IDs to include in results',
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'organization',
				displayName: 'Organization ID',
				values: [
					{
						displayName: 'Organization ID',
						name: 'value',
						type: 'string',
						default: '',
						routing: {
							send: {
								property: 'organization_ids[]',
								type: 'query',
							},
						},
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: '# Employees (Ranges)',
		name: 'organization_num_employees_ranges',
		type: 'fixedCollection',
		default: {},
		description: 'Employee count ranges like 1,10 or 5000,10000',
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'range',
				displayName: 'Range',
				values: [
					{
						displayName: 'Range',
						name: 'value',
						type: 'string',
						default: '',
						routing: {
							send: {
								property: 'organization_num_employees_ranges[]',
								type: 'query',
							},
						},
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Revenue Range Min',
		name: 'revenue_range_min',
		type: 'number',
		default: 0,
		description: "Minimum employer revenue (whole number)",
		routing: {
			send: {
				property: 'revenue_range[min]',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Revenue Range Max',
		name: 'revenue_range_max',
		type: 'number',
		default: 0,
		description: "Maximum employer revenue (whole number)",
		routing: {
			send: {
				property: 'revenue_range[max]',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Tech UIDs - Using All Of',
		name: 'currently_using_all_of_technology_uids',
		type: 'fixedCollection',
		default: {},
		description: 'Return people whose employer uses all listed technologies',
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'tech',
				displayName: 'Technology UID',
				values: [
					{
						displayName: 'UID',
						name: 'value',
						type: 'string',
						default: '',
						routing: {
							send: {
								property: 'currently_using_all_of_technology_uids[]',
								type: 'query',
							},
						},
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Tech UIDs - Using Any Of',
		name: 'currently_using_any_of_technology_uids',
		type: 'fixedCollection',
		default: {},
		description: 'Return people whose employer uses any of the listed technologies',
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'tech',
				displayName: 'Technology UID',
				values: [
					{
						displayName: 'UID',
						name: 'value',
						type: 'string',
						default: '',
						routing: {
							send: {
								property: 'currently_using_any_of_technology_uids[]',
								type: 'query',
							},
						},
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Tech UIDs - Not Using Any Of',
		name: 'currently_not_using_any_of_technology_uids',
		type: 'fixedCollection',
		default: {},
		description: 'Exclude people whose employer uses any of the listed technologies',
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'tech',
				displayName: 'Technology UID',
				values: [
					{
						displayName: 'UID',
						name: 'value',
						type: 'string',
						default: '',
						routing: {
							send: {
								property: 'currently_not_using_any_of_technology_uids[]',
								type: 'query',
							},
						},
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Active Job Titles at Employer',
		name: 'q_organization_job_titles',
		type: 'fixedCollection',
		default: {},
		description: 'Job titles listed in active postings at the employer',
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'jobTitle',
				displayName: 'Job Title',
				values: [
					{
						displayName: 'Job Title',
						name: 'value',
						type: 'string',
						default: '',
						routing: {
							send: {
								property: 'q_organization_job_titles[]',
								type: 'query',
							},
						},
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Employer Job Locations',
		name: 'organization_job_locations',
		type: 'fixedCollection',
		default: {},
		description: 'Locations of jobs being actively recruited by the employer',
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'jobLocation',
				displayName: 'Location',
				values: [
					{
						displayName: 'Location',
						name: 'value',
						type: 'string',
						default: '',
						routing: {
							send: {
								property: 'organization_job_locations[]',
								type: 'query',
							},
						},
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: '# Active Job Postings Min',
		name: 'organization_num_jobs_range_min',
		type: 'number',
		default: 0,
		description: 'Minimum number of active job postings at employer',
		routing: {
			send: {
				property: 'organization_num_jobs_range[min]',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: '# Active Job Postings Max',
		name: 'organization_num_jobs_range_max',
		type: 'number',
		default: 0,
		description: 'Maximum number of active job postings at employer',
		routing: {
			send: {
				property: 'organization_num_jobs_range[max]',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Job Posted Date Min',
		name: 'organization_job_posted_at_range_min',
		type: 'string',
		default: '',
		description: 'Earliest date when jobs were posted (YYYY-MM-DD)',
		routing: {
			send: {
				property: 'organization_job_posted_at_range[min]',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Job Posted Date Max',
		name: 'organization_job_posted_at_range_max',
		type: 'string',
		default: '',
		description: 'Latest date when jobs were posted (YYYY-MM-DD)',
		routing: {
			send: {
				property: 'organization_job_posted_at_range[max]',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Page',
		name: 'page',
		type: 'number',
		default: 1,
		description: 'Page number of results to retrieve',
		routing: {
			send: {
				property: 'page',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Per Page',
		name: 'per_page',
		type: 'number',
		default: 10,
		description: 'Number of results per page',
		routing: {
			send: {
				property: 'per_page',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['search'],
			},
		},
	},
];

export const peopleFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                                 people:enrich                              */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Email',
		name: 'email',
		type: 'string',
		default: '',
		placeholder: 'name@email.com',
		description: 'The email address of the person',
		routing: {
			send: {
				property: 'email',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['enrich'],
			},
		},
	},
	{
		displayName: 'Hashed Email',
		name: 'hashed_email',
		type: 'string',
		default: '',
		description: 'Hashed email (MD5 or SHA-256)',
		routing: {
			send: {
				property: 'hashed_email',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['enrich'],
			},
		},
	},
	{
		displayName: 'Full Name',
		name: 'name',
		type: 'string',
		default: '',
		description: 'Full name (first and last)',
		routing: {
			send: {
				property: 'name',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['enrich'],
			},
		},
	},
	{
		displayName: 'First Name',
		name: 'first_name',
		type: 'string',
		default: '',
		routing: {
			send: {
				property: 'first_name',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['enrich'],
			},
		},
	},
	{
		displayName: 'Last Name',
		name: 'last_name',
		type: 'string',
		default: '',
		routing: {
			send: {
				property: 'last_name',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['enrich'],
			},
		},
	},
	{
		displayName: "Organization Name",
		name: 'organization_name',
		type: 'string',
		default: '',
		description: "Person's employer name (current or previous)",
		routing: {
			send: {
				property: 'organization_name',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['enrich'],
			},
		},
	},
	{
		displayName: 'Domain',
		name: 'domain',
		type: 'string',
		default: '',
		description: "Employer's domain (e.g. apollo.io)",
		routing: {
			send: {
				property: 'domain',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['enrich'],
			},
		},
	},
	{
		displayName: 'Apollo Person ID',
		name: 'id',
		type: 'string',
		default: '',
		description: 'Apollo ID for the person',
		routing: {
			send: {
				property: 'id',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['enrich'],
			},
		},
	},
	{
		displayName: 'LinkedIn URL',
		name: 'linkedin_url',
		type: 'string',
		default: '',
		description: "Person's LinkedIn profile URL",
		routing: {
			send: {
				property: 'linkedin_url',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['enrich'],
			},
		},
	},
	{
		displayName: 'Reveal Personal Emails',
		name: 'reveal_personal_emails',
		type: 'boolean',
		default: false,
		description: 'Whether to reveal personal emails (may consume credits; GDPR restrictions apply)',
		routing: {
			send: {
				property: 'reveal_personal_emails',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['enrich'],
			},
		},
	},
	{
		displayName: 'Reveal Phone Numbers',
		name: 'reveal_phone_number',
		type: 'boolean',
		default: false,
		description: 'Whether to reveal all available phone numbers (requires webhook URL; async response)',
		routing: {
			send: {
				property: 'reveal_phone_number',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['enrich'],
			},
		},
	},
	{
		displayName: 'Webhook URL',
		name: 'webhook_url',
		type: 'string',
		default: '',
		description: 'Required if Reveal Phone Numbers is true. Apollo will send phone numbers asynchronously to this URL.',
		required: true,
		routing: {
			send: {
				property: 'webhook_url',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['enrich'],
				reveal_phone_number: [true],
			},
		},
	},
	/* -------------------------------------------------------------------------- */
	/*                              person:bulkEnrich                              */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Details (JSON Array)',
		name: 'detailsJson',
		type: 'string',
		default: '[]',
		description:
			'JSON array of up to 10 person objects (e.g. [{"email":"joshua.garrison@apollo.io"},{"name":"Tim Zheng","domain":"apollo.io"}])',
		typeOptions: {
			rows: 4,
		},
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['bulkEnrich'],
			},
		},
	},
	{
		displayName: 'Reveal Personal Emails',
		name: 'reveal_personal_emails',
		type: 'boolean',
		default: false,
		description: 'Whether to reveal personal emails (may consume credits; GDPR restrictions apply)',
		routing: {
			send: {
				property: 'reveal_personal_emails',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['bulkEnrich'],
			},
		},
	},
	{
		displayName: 'Reveal Phone Numbers',
		name: 'reveal_phone_number',
		type: 'boolean',
		default: false,
		description: 'Whether to reveal all available phone numbers (requires webhook URL; async response)',
		routing: {
			send: {
				property: 'reveal_phone_number',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['bulkEnrich'],
			},
		},
	},
	{
		displayName: 'Webhook URL',
		name: 'webhook_url',
		type: 'string',
		default: '',
		description: 'Required if Reveal Phone Numbers is true. Apollo will send phone numbers asynchronously to this URL.',
		required: true,
		routing: {
			send: {
				property: 'webhook_url',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['person'],
				operation: ['bulkEnrich'],
				reveal_phone_number: [true],
			},
		},
	},
];
