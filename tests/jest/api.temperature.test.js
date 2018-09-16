const supertest = require('supertest');
const { server, url } = require('../../backend/server');
const request = supertest(url);

describe('temperature api', () => {
	it('should return 404 for missing route', async () => {
		await server;
		await request.get('api/aa').expect(404);
	});

	it('should return 200 for correct route', async () => {
		await server;
		await request.get('api/temperature').expect(200);
	});

	it('should return 200 for specific temperature convertion case', async () => {
		await server;
		await request.get('api/temperature?fromValue=12&fromUnit=C&toUnit=C')
			.expect(200)
			.expect({
				"type": "temperature",
				"fromValue": "12",
				"fromUnit": "C",
				"toUnit": "C",
				"result": 12
				});
	});
});