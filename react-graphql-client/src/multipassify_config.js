const crypto = require('crypto');

const BLOCK_SIZE = 16;
const secret = '888a3fad1f0e5c3c80e1c442ae06ff42';

function Multipassify(secret) {
  const hash = crypto.createHash('sha256').update(secret).digest();
  this._encryptionKey = hash.slice(0, BLOCK_SIZE);
  this._signingKey = hash.slice(BLOCK_SIZE, 32);
}

Multipassify.prototype.encrypt = function(plaintext) {
  // Use a random IV
  const iv = crypto.randomBytes(BLOCK_SIZE);
  const cipher = crypto.createCipheriv('aes-128-cbc', this._encryptionKey, iv);

  // Use IV as first block of ciphertext
  const encrypted = Buffer.concat([iv, cipher.update(plaintext, 'utf8'), cipher.final()]);
  return encrypted;
}

Multipassify.prototype.encode = function (obj) {
  if (!obj) return;

  // Store the current time in ISO8601 format.
  // The token will only be valid for a small timeframe around this timestamp.
  obj["created_at"] = new Date().toISOString();

  // Serialize the customer data to JSON and encrypt it
  const cipherText = this.encrypt(JSON.stringify(obj));

  // Create a signature (message authentication code) of the ciphertext
  // and encode everything using URL-safe Base64 (RFC 4648)
  let token = Buffer.concat([cipherText, this.sign(cipherText)]).toString('base64');
  token = token.replace(/\+/g, '-') // Replace + with -
    .replace(/\//g, '_'); // Replace / with _

  return token;
}

Multipassify.prototype.sign = function (data) {
  const signed = crypto.createHmac("sha256", this._signingKey).update(data).digest();
  return signed;
}

Multipassify.prototype.generateUrl = function (obj, domain) {
  if (!domain) return;
  return `https://viome3-dev.myshopify.com/account/login/multipass/${this.encode(obj)}`;
}

// Create your customer data hash
module.exports = function (return_to) {
  const multipassify = new Multipassify(secret);
  const customerData = {
    email: "bob@shopify.com",
    created_at: "2013-04-11T15:16:23-04:00",

    first_name: "Bob",
    last_name: "Bobsen",
    tag_string: "canadian, premium",

    identifier: "bob123",
    remote_ip: "203.129.200.122",
    return_to,

    addresses: [{
      address1: "123 Oak St",
      city: "Ottawa",
      country: "Canada",
      first_name: "Bob",
      last_name: "Bobsen",
      phone: "555-1212",
      province: "Ontario",
      zip: "123 ABC",
      province_code: "ON",
      country_code: "CA",
      default: true
    }]
  }
  // Encode a Multipass token
  const token = multipassify.encode(customerData);

  //console.log('Token', token);

  // Generate a Shopify multipass URL to your shop
  const url = multipassify.generateUrl(customerData, "viome3-dev.myshopify.com");
  return url;
}