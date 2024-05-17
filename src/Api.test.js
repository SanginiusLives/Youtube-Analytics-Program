import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import Api, { fetchData, sendData } from './Api';

describe('Api Module', () => {
  let mock;

  beforeAll(() => {
    mock = new MockAdapter(Api);
  });

  afterEach(() => {
    mock.reset();
  });

  afterAll(() => {
    mock.restore();
  });

  test('fetchData fetches data successfully', async () => {
    const endpoint = '/test-endpoint';
    const mockData = { key: 'value' };

    mock.onGet(endpoint).reply(200, mockData);

    const data = await fetchData(endpoint);

    expect(data).toEqual(mockData);
  });

  test('fetchData handles errors', async () => {
    const endpoint = '/test-endpoint';
    const errorMessage = 'Network Error';

    mock.onGet(endpoint).networkError();

    await expect(fetchData(endpoint)).rejects.toThrow(`Error fetching data from ${endpoint}: ${errorMessage}`);
  });

  test('sendData sends data successfully', async () => {
    const endpoint = '/test-endpoint';
    const requestData = { key: 'value' };
    const responseData = { success: true };

    mock.onPost(endpoint, requestData).reply(200, responseData);

    const data = await sendData(endpoint, requestData);

    expect(data).toEqual(responseData);
  });

  test('sendData handles errors', async () => {
    const endpoint = '/test-endpoint';
    const requestData = { key: 'value' };
    const errorMessage = 'Network Error';

    mock.onPost(endpoint, requestData).networkError();

    await expect(sendData(endpoint, requestData)).rejects.toThrow(`Error sending data to ${endpoint}: ${errorMessage}`);
  })
})