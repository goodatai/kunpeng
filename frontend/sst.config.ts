import { SSTConfig } from "sst";
import { NextjsSite } from "sst/constructs";

export default {
  config(_input) {
    return {
      name: "www-goodat-ai",
      region: "us-west-1",
    };
  },
  stacks(app) {
    app.stack(function Site({ stack }) {
      const site = new NextjsSite(stack, "www-goodat-ai", {
        environment: {
          NEXT_PUBLIC_BACKEND_URL: "https://api.goodat.ai",
        },
        customDomain: {
          domainName: "goodat.ai",
          domainAlias: "www.goodat.ai",
          hostedZone: "goodat.ai"
        },
      });

      stack.addOutputs({
        Url: site.customDomainUrl || site.url,
      });
    });
  },
} satisfies SSTConfig;
