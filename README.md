![Apollo](nodes/Apollo/apollo.svg)

# n8n-nodes-apollo

Community n8n node for the Apollo API. Supports People, Organization, Contact, Account, and Deal operations.

- Package: `n8n-nodes-apollo`
- Requires: Node.js >= 20
- License: MIT
- Repository: https://github.com/arturl95/n8n-nodes-apollo
- npm: https://www.npmjs.com/package/n8n-nodes-apollo
- Maintainer: [AlusLabs](https://aluslabs.com) — automation systems and SaaS development

## Installation (in n8n)

1. In n8n, go to Settings → Community Nodes → Install.
2. Enter the package name: `n8n-nodes-apollo` and install.
3. Create credentials for "Apollo API" with your API key and optional base URL.

## Credentials

Credential: `Apollo API` (`credentials/ApolloApi.credentials.ts`)

- API Key: Injected via `x-api-key` header.
- Base URL: Defaults to `https://api.apollo.io`.
- Test: `GET /v1/auth/health` against the Base URL.

## Supported resources and operations

Resource: `Person`

- Enrich Person — POST `/api/v1/people/match`
- Search People — POST `/api/v1/mixed_people/search`
- Bulk Enrich People — POST `/api/v1/people/bulk_match`

Resource: `Organization`

- Enrich Organization — GET `/api/v1/organizations/enrich`
- Bulk Enrich Organizations — POST `/api/v1/organizations/bulk_enrich`
- Search Organizations — POST `/api/v1/mixed_companies/search`
- Get Job Postings — GET `/api/v1/organizations/{organization_id}/job_postings`

Resource: `Contact`

- Create Contact — POST `/api/v1/contacts`
- Update Contact — PUT `/api/v1/contacts/{contact_id}`
- Search Contacts — POST `/api/v1/contacts/search`

Resource: `Account`

- Search Accounts — POST `/api/v1/accounts/search`

Resource: `Deal`

- Create Deal — POST `/api/v1/opportunities`
- List All Deals — GET `/api/v1/opportunities/search`
- View Deal — GET `/api/v1/opportunities/{opportunity_id}`
- Update Deal — PATCH `/api/v1/opportunities/{opportunity_id}`

## Usage notes

- People Search does not generate new emails or phone numbers; use People Enrichment to retrieve contact details.
- Most filters are exposed as query parameters and support multiple values via n8n "Fixed Collection" fields (e.g., `person_titles[]`, `organization_locations[]`).
- Pagination parameters `page` and `per_page` are available where supported.
- Contact Create/Update body is constructed from simple fields and Fixed Collections (e.g., `label_names`). Pass `typed_custom_fields` as a JSON object string (e.g., `{ "60c39...": "2025-08-07" }`). Use Apollo's Custom Fields API to discover field IDs and valid data types.
- Apollo does not deduplicate on Create Contact. If you create a contact that already exists, Apollo will create a separate new contact.
- Some workspace-only endpoints have limits or plan requirements:
  - Contacts/Accounts Search results are capped (100 per page, up to 500 pages). Narrow filters to stay within limits.
  - Deals endpoints require a master API key; otherwise you will receive 403 responses.

## Use cases

This node is used in production for lead enrichment and outbound automation workflows, including:

- Lead enrichment pipelines for sales teams
- ICP-based prospecting and segmentation
- CRM data enrichment and sync

For an example of Apollo integration in a full outbound system, see [Parlantex](https://parlantex.com) — an AI-powered outbound platform that uses this node for prospect enrichment.

## Development
```bash
npm run lint
npm run build
npm run dev
```

Artifacts are emitted to `dist/`. Icons from `nodes/**` and `credentials/**` are copied to `dist` by the Gulp task `build:icons`.

## Changelog

- 0.1.1
  - Added Contact: Search Contacts; Create/Update field coverage and typed_custom_fields support
  - Added Account: Search Accounts with filtering, sorting, and pagination
  - Added Deal resource (UI label) with Create/List/View/Update endpoints
  - Alphabetized resource list and fixed lint issues; improved README usage notes

- 0.1.0
  - Initial release: Apollo credentials and node
  - Person: Enrich, Search, Bulk Enrich
  - Organization: Enrich, Bulk Enrich, Search, Job Postings

## About

This node is maintained by [AlusLabs](https://aluslabs.com), a consulting studio that builds automation systems, AI tools, and SaaS products. For custom n8n development or automation consulting, [get in touch](https://aluslabs.com/#contact).

## License

[MIT](https://github.com/arturl95/n8n-nodes-apollo/blob/master/LICENSE.md)
