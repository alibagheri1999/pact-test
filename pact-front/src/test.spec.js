import path from 'path'
// import Pact from "pact";
const Pact = require('@pact-foundation/pact');

describe('Pact Consumer Test', () => {
    let provider;
    beforeEach(() => {

        provider = new Pact.Pact({
            dir: path.resolve(process.cwd(), '../pact-front/pacts'),
            consumer: 'MyConsumer',
            provider: 'MyProvider',
            log: './logs/pact.log',
            port: 3000,
            spec: 3,
            // logLevel: 'debug',
        })
        return provider.setup();
    });

    afterAll(() => {
        return provider.finalize();
    });

    afterEach(() => {
        return provider.verify();
    });
    describe('GET /users', () => {
        const expectedUsers = ['John Doe', 'Jane Doe'];

        beforeEach(() => {
            return provider.addInteraction({
                state: 'I have a list of users',
                uponReceiving: 'a request for all userss with the builder pattern',
                withRequest: {
                    method: 'GET',
                    path: '/users',
                    query: { from: 'today' },
                    headers: { Accept: 'application/json' },
                },
                willRespondWith: {
                    status: 200,
                    headers: { 'Content-Type': 'application/json' },
                    body: expectedUsers,
                },
            });
        });

        it('returns an HTTP 200 and a list of docs', async () => {
            const response = await fetch('http://localhost:3000/users?from=today', { method: "GET", headers: { Accept: 'application/json' } });
            const users = await response.json();
            console.log(users, ['John Doe', 'Jane Doe']);
            expect(users).toEqual(['John Doe', 'Jane Doe']);
        });
    });
})





