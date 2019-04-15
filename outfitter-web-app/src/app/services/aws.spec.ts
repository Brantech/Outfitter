import { Aws } from './aws';

describe('Aws', () => {
  it('should create an instance', () => {
    expect(new Aws()).toBeTruthy();
  });
});
