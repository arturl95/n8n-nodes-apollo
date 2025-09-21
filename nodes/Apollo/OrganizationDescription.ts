import { INodeProperties } from 'n8n-workflow';

export const organizationOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		options: [
			{
				name: 'Enrich Organization',
				value: 'enrich',
				description: 'Enrich data for a single organization',
				action: 'Enrich an organization',
				routing: {
					request: {
						method: 'GET',
						url: '/api/v1/organizations/enrich',
					},
				},
			},
			{
				name: 'Bulk Enrich Organizations',
				value: 'bulkEnrich',
				description: 'Enrich data for up to 10 organizations',
				action: 'Bulk enrich organizations',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/organizations/bulk_enrich',
					},
				},
			},
			{
				name: 'Search Organizations',
				value: 'search',
				description: 'Find organizations using filters',
				action: 'Search organizations',
				routing: {
					request: {
						method: 'POST',
						url: '/api/v1/mixed_companies/search',
					},
				},
			},
			{
				name: 'Get Job Postings',
				value: 'jobPostings',
				description: 'Get current job postings for an organization',
				action: 'Get job postings',
				routing: {
					request: {
						method: 'GET',
						url: '={{ "/api/v1/organizations/" + $parameter.organization_id + "/job_postings" }}',
					},
				},
			},
		],
		default: 'enrich',
		displayOptions: {
			show: {
				resource: ['organization'],
			},
		},
	},
];

export const organizationFields: INodeProperties[] = [
	/* -------------------------------------------------------------------------- */
	/*                              organization:enrich                           */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Domain',
		name: 'domain',
		type: 'string',
		default: '',
		placeholder: 'apollo.io',
		description: "The organization's domain",
		required: true,
		routing: {
			send: {
				property: 'domain',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['enrich'],
			},
		},
	},

	/* -------------------------------------------------------------------------- */
	/*                          organization:bulkEnrich                           */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Domains',
		name: 'domains',
		type: 'fixedCollection',
		default: {},
		description: 'Add up to 10 domains to enrich',
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
						description: 'Company domain (e.g. apollo.io)',
						routing: {
							send: {
								property: 'domains[]',
								type: 'query',
							},
						},
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['bulkEnrich'],
			},
		},
	},

	/* -------------------------------------------------------------------------- */
	/*                           organization:search                               */
	/* -------------------------------------------------------------------------- */
	{
		displayName: '# Employees (Ranges)',
		name: 'organization_num_employees_ranges',
		type: 'fixedCollection',
		default: {},
		description: 'Employee count ranges like 1,10 or 10000,20000',
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
				resource: ['organization'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Organization Locations',
		name: 'organization_locations',
		type: 'fixedCollection',
		default: {},
		description: 'HQ locations (city, US state, or country)',
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
				resource: ['organization'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Exclude HQ Locations',
		name: 'organization_not_locations',
		type: 'fixedCollection',
		default: {},
		description: 'Exclude companies by HQ locations',
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
								property: 'organization_not_locations[]',
								type: 'query',
							},
						},
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Keywords (Company)',
		name: 'q_organization_keyword_tags',
		type: 'fixedCollection',
		default: {},
		description: 'Keyword tags associated with companies',
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'keyword',
				displayName: 'Keyword',
				values: [
					{
						displayName: 'Keyword',
						name: 'value',
						type: 'string',
						default: '',
						routing: {
							send: {
								property: 'q_organization_keyword_tags[]',
								type: 'query',
							},
						},
					},
				],
			},
		],
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Company Name',
		name: 'q_organization_name',
		type: 'string',
		default: '',
		description: 'Filter by company name (partial match allowed)',
		routing: {
			send: {
				property: 'q_organization_name',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Organization IDs',
		name: 'organization_ids',
		type: 'fixedCollection',
		default: {},
		description: 'Apollo organization IDs to include',
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'org',
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
				resource: ['organization'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Revenue Range Min',
		name: 'revenue_range_min',
		type: 'number',
		default: 0,
		description: 'Minimum revenue (whole number)',
		routing: {
			send: {
				property: 'revenue_range[min]',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Revenue Range Max',
		name: 'revenue_range_max',
		type: 'number',
		default: 0,
		description: 'Maximum revenue (whole number)',
		routing: {
			send: {
				property: 'revenue_range[max]',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Latest Funding Amount Min',
		name: 'latest_funding_amount_range_min',
		type: 'number',
		default: 0,
		description: 'Minimum amount received in the most recent funding round',
		routing: {
			send: {
				property: 'latest_funding_amount_range[min]',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Latest Funding Amount Max',
		name: 'latest_funding_amount_range_max',
		type: 'number',
		default: 0,
		description: 'Maximum amount received in the most recent funding round',
		routing: {
			send: {
				property: 'latest_funding_amount_range[max]',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Total Funding Amount Min',
		name: 'total_funding_range_min',
		type: 'number',
		default: 0,
		description: 'Minimum total funding received across all rounds',
		routing: {
			send: {
				property: 'total_funding_range[min]',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Total Funding Amount Max',
		name: 'total_funding_range_max',
		type: 'number',
		default: 0,
		description: 'Maximum total funding received across all rounds',
		routing: {
			send: {
				property: 'total_funding_range[max]',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Latest Funding Date Min',
		name: 'latest_funding_date_range_min',
		type: 'string',
		default: '',
		description: 'Earliest date of company\'s most recent funding (YYYY-MM-DD)',
		routing: {
			send: {
				property: 'latest_funding_date_range[min]',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Latest Funding Date Max',
		name: 'latest_funding_date_range_max',
		type: 'string',
		default: '',
		description: 'Latest date of company\'s most recent funding (YYYY-MM-DD)',
		routing: {
			send: {
				property: 'latest_funding_date_range[max]',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Currently Using Any Tech UIDs',
		name: 'currently_using_any_of_technology_uids',
		type: 'fixedCollection',
		default: {},
		description: 'Filter by any technologies currently used by the company',
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
				resource: ['organization'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Active Job Titles',
		name: 'q_organization_job_titles',
		type: 'fixedCollection',
		default: {},
		description: 'Active job titles listed by the company',
		typeOptions: {
			multipleValues: true,
		},
		options: [
			{
				name: 'title',
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
				resource: ['organization'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Job Locations',
		name: 'organization_job_locations',
		type: 'fixedCollection',
		default: {},
		description: 'Locations of jobs being recruited by the company',
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
				resource: ['organization'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: '# Active Job Postings Min',
		name: 'organization_num_jobs_range_min',
		type: 'number',
		default: 0,
		description: 'Minimum number of job postings active at the company',
		routing: {
			send: {
				property: 'organization_num_jobs_range[min]',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: '# Active Job Postings Max',
		name: 'organization_num_jobs_range_max',
		type: 'number',
		default: 0,
		description: 'Maximum number of job postings active at the company',
		routing: {
			send: {
				property: 'organization_num_jobs_range[max]',
				type: 'query',
			},
		},
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Latest Job Posted Date Min',
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
				resource: ['organization'],
				operation: ['search'],
			},
		},
	},
	{
		displayName: 'Latest Job Posted Date Max',
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
				resource: ['organization'],
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
				resource: ['organization'],
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
				resource: ['organization'],
				operation: ['search'],
			},
		},
	},

	/* -------------------------------------------------------------------------- */
	/*                        organization:jobPostings                             */
	/* -------------------------------------------------------------------------- */
	{
		displayName: 'Organization ID',
		name: 'organization_id',
		type: 'string',
		default: '',
		description: 'The organization ID of the company',
		required: true,
		displayOptions: {
			show: {
				resource: ['organization'],
				operation: ['jobPostings'],
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
				resource: ['organization'],
				operation: ['jobPostings'],
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
				resource: ['organization'],
				operation: ['jobPostings'],
			},
		},
	},
];
