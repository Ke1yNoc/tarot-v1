import fetch from '@/lib/fetch';

export async function question(question: string): Promise<any> {
  return await fetch(`/api/llm/question`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "userID": "test",
      "question": question
    })
  });
}

export async function interpretation(question: string,
                                     solutionID: string,
                                     solutionName: string,
                                     result: string
): Promise<any> {
  return await fetch(`/api/llm/interpretation`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "userID": "test",
      "question": question,
      "solutionID": solutionID,
      "solutionName": solutionName,
      "drawResult": result
    })
  });
}

export async function knowledge(q: string): Promise<any> {
  return await fetch(`/api/llm/knowledge`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "questionGeneral": q,
    })
  });
}


