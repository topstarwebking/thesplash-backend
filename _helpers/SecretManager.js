const { SecretManagerServiceClient } = require("@google-cloud/secret-manager");
const conf = require("../config.json");
const localDBURI = conf.localDBURI;
const localJWT = conf.localJWT;

async function getSecret(secret) {
  if (conf.localDBFlag == "true") {
    switch (secret) {
      case "freshcart-mongo-uri":
        return localDBURI;
      case "freshcart-jwt-secret":
        return localJWT;
    }
  } else {
    try {
      const gcpSecretClient = new SecretManagerServiceClient();
      const name = `projects/241022197986/secrets/${secret}/versions/latest`;
      const [version] = await gcpSecretClient.accessSecretVersion({
        name: name,
      });
      const payload = version.payload.data.toString();
      return payload;
    } catch (error) {
      console.log("Error fetching secret - " + secret);
      return;
    }
  }
}

module.exports.getSecret = getSecret;



//TODO: Implement node-cache to reduce calls to GCP Secret Manager