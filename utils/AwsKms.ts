import AWS = require("aws-sdk");

export class AwsKms {
    private readonly keyId: string;
    constructor(keyId : string) {
        this.keyId = keyId;
    }

    kmsEncrypt(secret: string) {
        const kms = new AWS.KMS();
        const params = {
            KeyId: this.keyId,
            Plaintext: Buffer.from(secret),
        };

        kms.encrypt(params, (err, data) => {
            if (err) return err;
            else return data.CiphertextBlob.toString("base64");
        });
    }

    kmsDecrypt(encryptedSecret: string) {
        const kms = new AWS.KMS();
        const params = {
            CiphertextBlob: Buffer.from(encryptedSecret, 'base64'),
        };

        kms.decrypt(params, (err, data) => {
            if (err) return err;
            else return data.Plaintext.toString();
        });

    }
}