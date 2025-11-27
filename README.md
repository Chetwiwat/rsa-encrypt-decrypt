# Setup

1. Clone the repository:
git clone <repository-url>
cd <repository-folder>


2. Install dependencies:
npm install


3. Create a .env file in the root directory with the following example values:

# example .env file

#RSA Public Key (use \n for line breaks)

RSA_PUBLIC_KEY="-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQD...\n-----END PUBLIC KEY-----"

#RSA Private Key (use \n for line breaks)

RSA_PRIVATE_KEY="-----BEGIN RSA PRIVATE KEY-----\nMIIBOgIBAAJBAL...\n-----END RSA PRIVATE KEY-----"


You can generate keys here: https://cryptotools.net/rsagen

Make sure to copy the keys with literal \n characters as shown above.

# Run the Service

Start the NestJS application:

npm run start


By default, it runs on http://localhost:3000

# API Documentation (Swagger)

Swagger is available at:

http://localhost:3000/api-docs

# Run Tests

Unit tests are written using Jest. Run tests with:

npm run test


Make sure .env is set up before running tests, as tests read the RSA keys from environment variables.

Notes

The .env file must have valid RSA keys in PEM format with \n for line breaks.

Validation rules:

payload is required and max 2000 characters.

data1 and data2 are required for decryption.

This README covers everything you need to run the service, test it, and provide valid .env keys.
