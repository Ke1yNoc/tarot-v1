import fetch from '@/lib/fetch';

export async function image(file: File, layout: string): Promise<any> {
  const formData = new FormData();
  formData.append('image', file);
  formData.append('layout', layout);
  return await fetch(`/api/image`, {
    method: 'POST',
    body: formData,
  });
}
