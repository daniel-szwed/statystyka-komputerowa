import { RoundToOneDecimalPipe } from './round-to-one-decimal.pipe';

describe('RoundToOneDecimalPipe', () => {
  it('create an instance', () => {
    const pipe = new RoundToOneDecimalPipe();
    expect(pipe).toBeTruthy();
  });
});
