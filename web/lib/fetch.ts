export class ResponseBody {
  code?: number;
  data?: any;
  message?: string;
}

export default async function fetcher<JSON = any>(
  input: RequestInfo,
  init?: RequestInit
): Promise<JSON> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  const wrappedInit = {
    ...init,
    headers: {
      Authorization: `test`,
      ...init?.headers,
    },
  };

  const res = await fetch(input, wrappedInit);
  const data = await res.text();
  const jsonData = data ? JSON.parse(data) : (ResponseBody as JSON);
  if (!res.ok) {
    throw new Error(jsonData.message ?? "server error");
  }
  if (res.status == 401) {
    localStorage.removeItem('token');
  }
  if (jsonData.code != 200) {
    throw new Error(jsonData.message ?? "server error");
  }
  return jsonData.data;
}
