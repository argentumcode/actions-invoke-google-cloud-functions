import * as core from "@actions/core";
import { GoogleAuth } from "google-auth-library";

async function main(): Promise<void> {
  let serviceAccountKey = core.getInput("service_account_key");
  if (serviceAccountKey && !serviceAccountKey.trim().startsWith("{")) {
    serviceAccountKey = Buffer.from(serviceAccountKey, "base64").toString();
  }
  const authenticator = serviceAccountKey
    ? new GoogleAuth({ credentials: JSON.parse(serviceAccountKey) })
    : new GoogleAuth({});
  const url = core.getInput("url");
  const client = await authenticator.getIdTokenClient(url);
  if (core.getInput("skip_request")) {
    const token = await client.idTokenProvider.fetchIdToken(
      client.targetAudience
    );
    core.setSecret(token);
    core.setOutput("token", token);
    return;
  }
  const res = await client.request({
    url: url + core.getInput("path"),
    method: "POST",
    data: core.getInput("payload"),
    headers: {
      "Content-Type": core.getInput("content_type")
    }
  });
  core.setOutput("data", res.data);
}

try {
  main().catch(err => {
    core.setFailed(err.message);
  });
} catch (err) {
  core.setFailed(err.message);
}
