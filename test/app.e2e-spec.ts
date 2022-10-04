import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { Transport, ClientProxy, ClientsModule } from '@nestjs/microservices';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

jest.setTimeout(50000);
describe('AppController (e2e)', () => {
  let app: INestApplication;
  let producer: INestApplication;
  let client: ClientProxy;
  let scope: Record<string, any>;
  let anotherScope: Record<string, any>;
  let role: Record<string, any>;
  let principal: Record<string, any>;

  beforeAll(async () => {
    const appFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();
    app = appFixture.createNestApplication();
    app.connectMicroservice({
      transport: Transport.RMQ,
      options: {
        urls: [process.env.BROKER_URI],
        queue: process.env.QUEUE,
        queueOptions: {
          durable: false,
        },
      },
    });
    await app.listen(process.env.PORT || 3000);
    await app.startAllMicroservices();
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        ClientsModule.register([
          {
            name: 'RMQ_PRODUCER',
            transport: Transport.RMQ,
            options: {
              urls: [process.env.BROKER_URI],
              queue: process.env.QUEUE,
              queueOptions: {
                durable: false,
              },
            },
          },
        ]),
      ],
    }).compile();
    producer = moduleFixture.createNestApplication();
    await producer.listen(3009);
    client = await producer.get('RMQ_PRODUCER');
  });
  afterAll(async () => {
    await Promise.all([app.close(), client.close(), producer.close()]);
  });

  // it('should consume scopes created event ', async () => {
  //   const obs = client
  //     .emit('authz.scopes.created', {
  //       scopes: [
  //         { urn: 'unique.resource.name.one', namespace: 'service.name.one' },
  //       ],
  //     })
  //     .forEach((next) => {
  //       console.log('next is,', next);
  //     });
  //   const sleep = new Promise((resolve) => {
  //     setTimeout(resolve, 20000);
  //   });

  //   await sleep;
  //   return true;
  // });

  it('should create scope POST /scope/create  ', async () => {
    const scopeResponse = await request(app.getHttpServer())
      .post('/scopes/register')
      .send({
        scopes: [
          { urn: 'unique.resource.name.one', namespace: 'service.name.one' },
          { urn: 'unique.resource.name.two', namespace: 'service.name.two' },
        ],
      });

    scope = scopeResponse.body[0];
    anotherScope = scopeResponse.body[1];
    expect(anotherScope).toHaveProperty('id');
    return expect(scope).toHaveProperty('id');
  });
  it('should create role POST /role/create  ', async () => {
    const roleResponse = await request(app.getHttpServer())
      .post('/role/create')
      .send({
        name: 'role_one',
        scopesIds: [scope.id],
      });
    role = roleResponse.body;
    return expect(role).toHaveProperty('scopes', [scope.id]);
  });
  it('should create role with scope POST /principal/create  ', async () => {
    const principalResponse = await request(app.getHttpServer())
      .post('/principal/create')
      .send({ roles: [role.id] });
    principal = principalResponse.body;
    return expect(principal).toHaveProperty('roles', [role.id]);
  });
  it('should return authorization map scope: true POST /authorize  ', async () => {
    const authzResponse = await request(app.getHttpServer())
      .post('/authorize')
      .send({ id: principal.id, urns: [scope.urn] });
    const authzMap = authzResponse.body;
    return expect(authzMap[scope.urn]).toBeTruthy();
  });
  it('should return authorization map anotherScope: false POST /authorize  ', async () => {
    const authzResponse = await request(app.getHttpServer())
      .post('/authorize')
      .send({ id: principal.id, urns: [anotherScope.urn] });
    const authzMap = authzResponse.body;
    return expect(authzMap[anotherScope.urn]).toBeFalsy();
  });
});
