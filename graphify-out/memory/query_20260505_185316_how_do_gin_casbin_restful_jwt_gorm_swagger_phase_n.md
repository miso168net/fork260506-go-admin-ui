---
type: "query"
date: "2026-05-05T18:53:16.485130+00:00"
question: "How do Gin/Casbin/RESTful/JWT/GORM/Swagger/Phase-N nodes connect to the rest?"
contributor: "graphify"
source_nodes: ["Gin Web Framework", "Casbin RBAC", "JWT Authentication", "Phase 0", "GORM ORM"]
---

# Q: How do Gin/Casbin/RESTful/JWT/GORM/Swagger/Phase-N nodes connect to the rest?

## Answer

They do not. All are degree-1 nodes parented to README.md / UPGRADE_TO_VUE3.md and have only the contains edge from the doc itself. There is NO Gin or Casbin code anywhere in this repo because this is the FRONTEND fork (go-admin-ui). The backend nouns (Gin Web Framework, Casbin RBAC, JWT Authentication, GORM ORM, Swaggo) are concept nodes lifted from the README which describes the full-stack project, but the actual Go backend is a sibling repo (go-admin). Phase 0..7 nodes from UPGRADE_TO_VUE3.md are project-management milestones, not code, so they also have no calls/imports — only doc-membership edges. This is correctly modelled: degree-1 == 'mentioned by docs, not realized in code in this repo'. The graph is honest. If a UI feature were to wire to a backend concept (e.g. JWT token handling lives in src/utils/auth.js as setToken/getToken/removeToken — community 13), those concept-to-code links could be added manually or via a deep-mode rerun.

## Source Nodes

- Gin Web Framework
- Casbin RBAC
- JWT Authentication
- Phase 0
- GORM ORM