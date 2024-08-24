import fetch from '@/lib/fetch';

export async function getTarot(id: string): Promise<any> {
  return await fetch(`/api/tarot?tarotId=${id}`, {
    method: 'GET',
  });
}
