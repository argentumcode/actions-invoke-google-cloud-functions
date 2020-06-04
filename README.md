# Call Google Cloud HTTP Functions

A Github Action to invoke Google Cloud HTTP Functions [with Service Account credentials](https://cloud.google.com/functions/docs/securing/authenticating).

## Example

### With service account key

```yaml
steps;
- name: Call Function
  uses: argentumcode/actions-invoke-google-cloud-functions@master
  with:
    service_account_key: ${{ secrets.SERVICE_ACCOUNT_KEY }}
    url: https://us-central1-cocomero-dev.cloudfunctions.net/SOME_FUNCTION
    payload: |
      {"some": "json payload"}
    content_type: "application/json"
```

### With GoogleCloudPlatform/github-actions/setup-gcloud

```yaml
steps:
  - uses: GoogleCloudPlatform/github-actions/setup-gcloud@master
    with:
      export_default_credentials: true
      service_account_key:  ${{ secrets.SERVICE_ACCOUNT_KEY }}

  - name: test with google default credentials
    uses: argentumcode/actions-invoke-google-cloud-functions@master
    with:
      url: https://us-central1-cocomero-dev.cloudfunctions.net/SOME_FUNCTION

```
