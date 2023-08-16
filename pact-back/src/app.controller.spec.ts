import { PactV3, MatchersV3 } from '@pact-foundation/pact';
import {AxiosPromise } from 'axios'
import axios from 'axios'
import path from 'path';
import { async } from 'rxjs';

// Create a 'pact' between the two applications in the integration we are testing
const provider = new PactV3({
  dir: './pacts',
  consumer: 'MyConsumer',
  provider: 'MyProvider',
});

// API Client that will fetch userss from the Users API
// This is the target of our Pact test
class UsersService {
  url: any
  constructor(url) {
    this.url = url
  }
  public getMeUserss = (from: string): AxiosPromise => {
    return axios.request({
      baseURL: this.url,
      headers: { Accept: 'application/json' },
      params: { from },
      method: 'GET',
      url: '/users',
    });
  };
}

const usersExample = ['John Doe', 'Jane Doe'];
// const EXPECTED_BODY = MatchersV3.eachLike(usersExample);

describe('GET /users', () => {
  it('returns an HTTP 200 and a list of docs', () => {
    provider
      .given('I have a list of users')
      .uponReceiving('a request for all userss with the builder pattern')
      .withRequest({
        method: 'GET',
        path: '/users',
        query: { from: 'today' },
        headers: { Accept: 'application/json' },
      })
      .willRespondWith({
        status: 200,
        headers: { 'Content-Type': 'application/json' },
        body: usersExample,
      });

    return provider.executeTest(async(mockserver) => {
      let usersService = new UsersService(mockserver.url);
      const response = await usersService.getMeUserss('today')
      console.log(response, usersExample);
      expect(response.data).toEqual(usersExample);
    });
  });
});