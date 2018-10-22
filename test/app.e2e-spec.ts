import request, { SuperTest } from 'supertest';
import { Test } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';

import { AppModule } from './../src/app.module';

describe('EventSource', () => {
  let app: INestApplication;
  let test: SuperTest<any>;

  beforeEach(async () => {
    const moduleFixture = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    test = request(app.getHttpServer());
  });

  it('test', () => {});
});
