---
source_file: "scripts/k8s/deploy.yml"
type: "code"
community: "Community 46"
tags:
  - graphify/code
  - graphify/EXTRACTED
  - community/Community_46
---

# Deployment: go-admin-ui-v1

## Connections
- [[ConfigMap nginx-frontend (default.conf)]] - `references` [EXTRACTED]
- [[SPA Root app]] - `shares_data_with` [INFERRED]
- [[Service go-admin-ui (port 80)]] - `references` [EXTRACTED]

#graphify/code #graphify/EXTRACTED #community/Community_46