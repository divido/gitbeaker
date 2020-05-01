import { RequesterType } from '@gitbeaker/requester-utils';
import { ResourceTemplates } from '../../../src/templates';
import { RequestHelper } from '../../../src/infrastructure';

jest.mock('../../../src/infrastructure/RequestHelper');

let service: ResourceTemplates;

beforeEach(() => {
  const requester = {
    get: jest.fn(() => Promise.resolve([])),
    post: jest.fn(() => Promise.resolve({})),
    put: jest.fn(() => Promise.resolve({})),
    delete: jest.fn(() => Promise.resolve({})),
  } as RequesterType;

  service = new ResourceTemplates('resource', {
    requester,
    token: 'abcdefg',
  });
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('Instantiating ResourceTemplates service', () => {
  it('should create a valid service object', async () => {
    expect(service).toBeInstanceOf(ResourceTemplates);
    expect(service.url).toBeDefined();
    expect(service.url).toContain('resource');
  });
});

describe('ResourceTemplates.all', () => {
  it('should call the correct url', async () => {
    await service.all();

    expect(RequestHelper.get).toBeCalledWith(service, '', undefined);
  });
});

describe('ResourceTemplates.show', () => {
  it('should call the correct url with a resource id', async () => {
    await service.show(6);

    expect(RequestHelper.get).toBeCalledWith(service, '6', undefined);
  });
});
