import { expect } from 'chai';
import axios from 'axios';
import adapter from 'axios/lib/adapters/http';
import { beforeAndAfter, app } from '../environment';
import { baseURL } from '../test-common';
import { wixAxiosInstanceConfig } from 'wix-axios-config';

const axiosInstance = wixAxiosInstanceConfig(axios, { baseURL, adapter });

describe('When rendering', () => {
  beforeAndAfter();

  it('should return server side rendered html', async () => {
    const url = app.getUrl('/');
    const response = await axiosInstance.get(url);

    expect(response.data).to.contain('Wix Universal Project Boilerplate');
    expect(response.data).to.contain('Hello World!');
  });
});
