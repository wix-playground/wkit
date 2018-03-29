import axios from 'axios';
import adapter from 'axios/lib/adapters/http';
import { beforeAndAfter, app } from '../environment';
import { wixAxiosInstanceConfig } from 'wix-axios-config';

const axiosInstance = wixAxiosInstanceConfig(axios, { adapter });

describe('When rendering', () => {
  beforeAndAfter();

  it('should display a title', async () => {
    const url = app.getUrl('/');
    const response = await axiosInstance.get(url);

    expect(response.data).to.contain('Wix Full Stack Project Boilerplate');
  });
});
