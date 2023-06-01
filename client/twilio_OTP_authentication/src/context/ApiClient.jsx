const BASE_API_URL = import.meta.env.BASE_URL;

export default class TwilioAPIClient {
    constructor(){
        this.base_url = BASE_API_URL + '/api' 
    }

    async request(options) {
        let query = new URLSearchParams(options.query || {}).toString();
        if (query !== '') {
          query = '?' + query;
        }
    
        let response;
        try {
          response = await fetch(this.base_url + options.url + query, {
            method: options.method,
            headers: {
              'Content-Type': 'application/json',
              ...options.headers,
            },
            body: options.body ? JSON.stringify(options.body) : null,
          });
        }
        catch (error) {
          response = {
            ok: false,
            status: 500,
            json: async () => { return {
              code: 500,
              message: 'The server is unresponsive',
              description: error.toString(),
            }; }
          };
        }
    
        return {
          status: response.status,
          body: response.status !== 204 ? await response.json() : null
        };
      }
    
      async get(url, query, options) {
        return this.request({method: 'GET', url, query, ...options});
      }
    
      async post(url, body, options) {
        return this.request({method: 'POST', url, body, ...options});
      }
    
}

