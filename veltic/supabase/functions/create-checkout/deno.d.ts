// Type declarations for Deno environment
declare namespace Deno {
  export interface Env {
    get(key: string): string | undefined;
  }
  export const env: Env;
}

// Type declarations for imported modules
declare module "https://deno.land/std@0.168.0/http/server.ts" {
  export function serve(handler: (req: Request) => Response | Promise<Response>): void;
}

declare module "https://esm.sh/stripe@13.6.0?target=deno" {
  export default class Stripe {
    constructor(secretKey: string, config?: {
      apiVersion: string;
      httpClient: any;
    });
    
    static createFetchHttpClient(): any;
    
    checkout: {
      sessions: {
        create(params: any): Promise<any>;
      }
    };
  }
} 