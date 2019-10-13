import { exec } from 'child_process';
import { promisify } from 'util';
import { Projects } from '../../../src/core';

const runCmd = promisify(exec);

jest.mock('../../../src/core/infrastructure/KyRequester', () => ({
  get: jest.fn(() => {
    body: [];
  }),
  post: jest.fn(() => {
    body: {
    }
  }),
  put: jest.fn(() => {
    body: {
    }
  }),
}));

jest.mock('../../../src/core/services/Projects');

describe('Projects.create', () => {
  it('should create a valid project', async () => {
    runCmd(
      `gitlab projects create --gl-host https://test.com --gl-token 123213 --name "Test CLI Project" `,
    );

    expect(Projects).toHaveBeenCalledWith({
      host: 'https://test.com',
      token: '123213',
    });

    expect(Projects.create).toHaveBeenCalledWith({ name: 'Test CLI Project' });
  });
});
