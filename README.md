# n8n-nodes-engagebay

This is an n8n community node. It lets you use EngageBay in your n8n workflows.

EngageBay is an all-in-one marketing, sales, and service CRM software designed to help businesses acquire, engage, and convert website visitors into customers.

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

[Installation](#installation)  
[Operations](#operations)  
[Credentials](#credentials)  
[Compatibility](#compatibility)  
[Resources](#resources)  

## Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

## Operations

### Contact Operations
- **Get Contact by ID**: Retrieve a contact by its ID from EngageBay

### Track Operations
- **Get All Tracks**: Retrieve all tracks from EngageBay
- **Get Track by ID**: Retrieve a specific track by its ID

### User Operations
- **Get Owners**: Retrieve all users/owners from EngageBay
- **Get User Profile**: Retrieve the current user's profile information

## Credentials

To use the EngageBay node, you need to have an EngageBay account and obtain an API key.

1. Sign up for an EngageBay account at [https://www.engagebay.com/](https://www.engagebay.com/)
2. Log in to your EngageBay account
3. Go to Settings > API
4. Copy your API key
5. In n8n, create new credentials of type 'EngageBay Credentials API'
6. Enter your EngageBay Instance URL (usually https://app.engagebay.com)
7. Enter your API key
8. Save the credentials

## Compatibility

This node has been tested with n8n version 1.0.0 and above. It requires Node.js version 20.15 or later.

## Resources

* [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
* [EngageBay API documentation](https://docs.engagebay.com/docs)
* [EngageBay website](https://www.engagebay.com/)

## License

[MIT](https://github.com/mongus/n8n-nodes-engagebay/blob/master/LICENSE.md)
