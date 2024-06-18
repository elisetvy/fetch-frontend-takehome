const BASE_API_URL = "https://frontend-take-home-service.fetch.com";

type UserData = {
  name: string;
  email: string;
};

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

  static async login(userData: UserData) {
    const response = await this.request("auth/login", userData, "POST");

    return response;
  }

  /** Returns array of possible breed names. */

  static async getDogs() {
    const response = await this.request("dogs/breeds");

    return response;
  }
}

export default Api;
