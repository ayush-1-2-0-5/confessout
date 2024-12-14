// src/types/unirest.d.ts
declare module 'unirest' {
    interface UnirestRequest {
      query(params: Record<string, string>): void;
      headers(headers: Record<string, string>): void;
      end(callback: (response: any) => void): void;
    }
  
    const unirest: {
      get(url: string): UnirestRequest;
    };
  
    export = unirest;
  }
  