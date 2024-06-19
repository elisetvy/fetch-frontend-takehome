import { UserData, IDs, QueryParams } from "./interfaces";

const BASE_API_URL = "https://frontend-take-home-service.fetch.com";

class Api {
  static token = null;

  /** Formats requests. */

  static async request(endpoint: string, data = {}, method = "GET") {
    const url = new URL(`${BASE_API_URL}/${endpoint}`);
    const headers = {
      "content-type": "application/json",
    };

    url.search = method === "GET" ? new URLSearchParams(data).toString() : "";

    // Set to undefined since the body property cannot exist on a GET method
    const body = method !== "GET" ? JSON.stringify(data) : undefined;

    const resp = await fetch(url, {
      method,
      body,
      headers,
      credentials: "include",
    });

    // Fetch API does not throw an error, have to dig into the resp for msgs
    if (!resp.ok) {
      console.error("API Error:", resp.statusText, resp.status);
      const { error } = await resp.json();
      throw Array.isArray(error) ? error : [error];
    }

    return await resp;
  }

  /** Log in user. */

  static async login(userData: UserData) {
    const response = await this.request("auth/login", userData, "POST");

    return response;
  }

  /** Invalidate auth cookie. */

  static async logout() {
    const response = await this.request("auth/logout");

    return response;
  }

  /** Returns array of possible breed names. */

  static async getBreeds() {
    const response = await this.request("dogs/breeds");

    return response.json();
  }

  /** Returns an object with the following properties:

resultIds - an array of dog IDs matching your query
total - the total number of results for the query (not just the current page)
next - a query to request the next page of results (if one exists)
prev - a query to request the previous page of results (if one exists)

The maximum total number of dogs that will be matched by a single query is 10,000. */

  static async searchDogs(queryParams: QueryParams) {
    const response = await this.request("dogs/search", {
      ...queryParams,
      size: 24,
    });

    return response.json();
  }

  /** Returns array of dog objects. */

  static async fetchDogs(ids: IDs) {
    const response = await this.request("dogs", ids, "POST");

    return response.json();
  }
}

export default Api;
