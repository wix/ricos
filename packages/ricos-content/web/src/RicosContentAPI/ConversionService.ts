import { ConversionService } from '../types';

export class ConversionServiceClient<S, T> implements ConversionService<S, T> {
  endpoint = '';

  configure(endpoint: string) {
    this.endpoint = endpoint;
  }

  convert(content: S) {
    return fetch(this.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(content),
    }).then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json() as Promise<T>;
    });
  }
}
