export async function ping(auth: string): Promise<any> {
  return await fetch(`/api/llm/ping`, {
    method: 'GET',
    headers: {
      'Authorization': auth
    }
  });
}
