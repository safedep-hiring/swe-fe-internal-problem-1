import { Ecosystem } from "@buf/safedep_api.bufbuild_es/safedep/messages/package/v1/ecosystem_pb.js";
import { InsightService } from "@buf/safedep_api.connectrpc_es/safedep/services/insights/v2/insights_connect.js";
import { createPromiseClient, Interceptor } from "@connectrpc/connect";
import { createConnectTransport } from "@connectrpc/connect-node";


function authenticationInterceptor(token: string, tenant: string): Interceptor {
  return (next) => async (req) => {
    req.header.set("authorization", token);
    req.header.set("x-tenant-id", tenant);
    return await next(req);
  }
}

async function main() {
  const token = process.env.SAFEDEP_API_KEY;
  if (!token) {
    console.error("SAFEDEP_API_KEY is required")
    process.exit(1)
  }

  const tenantId = process.env.SAFEDEP_TENANT_ID;
  if (!tenantId) {
    console.error("SAFEDEP_TENANT_ID is required")
    process.exit(1)
  }

  const transport = createConnectTransport({
    baseUrl: "https://api.safedep.io",
    httpVersion: "1.1",
    interceptors: [authenticationInterceptor(token, tenantId)]
  });

  const client = createPromiseClient(InsightService, transport);
  const res = await client.getPackageVersionInsight({
    packageVersion: {
      package: {
        ecosystem: Ecosystem.NPM,
        name: "express",
      },
      version: "4.10.5"
    }
  })

  console.log(JSON.stringify(res.toJson(), null, 2))
}

main()
