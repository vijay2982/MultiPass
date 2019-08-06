# react-graphql-client

An example using [graphql-js-client](https://github.com/Shopify/graphql-js-client) built with [React](https://facebook.github.io/react/).
This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
This example uses [babel-plugin-graphql-js-client-transform](https://github.com/Shopify/babel-plugin-graphql-js-client-transform)
in conjunction with [graphql-js-client](https://github.com/Shopify/graphql-js-client) to build queries.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with NPM)
* [Yarn](https://yarnpkg.com/en/)

## Installation

* `git clone https://github.com/Shopify/MultiPass.git`
* `cd MultiPass`
* `cd react-graphql-client`
* `yarn install`

## Configuring

If you would like to connect your store to this example, open up `src/index.js` and update the `url` and `X-Shopify-Storefront-Access-Token` header:

```js
export const client = new Client(typeBundle, {
  url: 'YOUR_SOPIFY_URL',
  fetcherOptions: {
    headers: {
      'X-Shopify-Storefront-Access-Token': 'YOUR_ACCESS_TOKEN_HERE'
    }
  }
});
```

## Running

To start the local development server run below command:

* `yarn start`

## Multipass Integration Start 

## Some Guidelines
1. In order to generate `url` using multipass we have to feed `checkout` url to function exported in multipass_config.js file.
2. Multipass will generate url using `HMAC` and `SHA512` hash algorithm and encode it using `base64` algorithm.
3. The Url which was fed to multipass will be used as the `return_to` url in customer data provided by customer.
4. We have used sample customer data. If you want to use different customer data then change `customerData` field to the data you want to give it in `multipass_config.js` file.

## Multipass Integration End 

* Visit your app at [http://localhost:3000](http://localhost:3000).

## Further Reading / Useful Links

* [React](https://facebook.github.io/react/)
* [GraphQL JS Client](https://github.com/Shopify/graphql-js-client)

## Contributing
For help on setting up the repo locally, building, testing, and contributing
please see [CONTRIBUTING.md](https://github.com/Shopify/storefront-api-examples/blob/master/CONTRIBUTING.md).

## Code of Conduct
All developers who wish to contribute through code or issues, take a look at the
[CODE_OF_CONDUCT.md](https://github.com/Shopify/storefront-api-examples/blob/master/CODE_OF_CONDUCT.md).

## License

MIT, see [LICENSE](https://github.com/Shopify/storefront-api-examples/blob/master/LICENSE.txt) for details.

<img src="https://cdn.shopify.com/shopify-marketing_assets/builds/19.0.0/shopify-full-color-black.svg" width="200" />
