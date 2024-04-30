import * as AWS from 'aws-sdk';

// Initialize AWS SDK with your AWS credentials and region
AWS.config.update({ region: 'us-west-2',
    credentials: {
        accessKeyId: "accessKeyId",
        secretAccessKey: "secretAccessKey",
        sessionToken: "sessionToken" }
});

// Create an instance of the KMS service
const kms = new AWS.KMS();

// Encrypt function
export async function encryptData(data: string, keyId: string): Promise<string> {
    const params = {
        KeyId: keyId,
        Plaintext: data
    };

    try {
        const result = await kms.encrypt(params).promise();
        return result.CiphertextBlob!.toString('base64');
    } catch (err) {
        console.error('Error encrypting data:', err);
        throw err;
    }
}

// Decrypt function
export async function decryptData(ciphertext: string): Promise<string> {
    const params = {
        CiphertextBlob: Buffer.from(ciphertext, 'base64')
    };

    try {
        const result = await kms.decrypt(params).promise();
        return result.Plaintext!.toString();
    } catch (err) {
        console.error('Error decrypting data:', err);
        throw err;
    }
}
