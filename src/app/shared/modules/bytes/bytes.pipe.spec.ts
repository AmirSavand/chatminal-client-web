import { BytesPipe } from '@modules/bytes/bytes.pipe';

describe('BitesPipe', (): void => {
  let pipe: BytesPipe;

  beforeEach((): void => {
    pipe = new BytesPipe();
  });

  it('should return correct bytes format', (): void => {
    expect(pipe.transform(98)).toEqual('98 B');
    expect(pipe.transform(999)).toEqual('999 B');
    expect(pipe.transform(1024)).toEqual('1.02 KB');
    expect(pipe.transform(10240)).toEqual('10.24 KB');
    expect(pipe.transform(102400)).toEqual('102.4 KB');
    expect(pipe.transform(1023488)).toEqual('1.02 MB');
    expect(pipe.transform(15456864)).toEqual('15.46 MB');
    expect(pipe.transform(4616548610)).toEqual('4.62 GB');
    expect(pipe.transform(461654861500)).toEqual('461.65 GB');
    expect(pipe.transform(12345678)).toEqual('12.35 MB');
    expect(pipe.transform(1000000000000)).toEqual('1 TB');
    expect(pipe.transform(1000000000000000)).toEqual('1 PB');
    expect(pipe.transform(1000000000000000000)).toEqual('1 EB');
    expect(pipe.transform(1000000000000000000000)).toEqual('1 ZB');
    expect(pipe.transform(1000000000000000000000000)).toEqual('1 YB');
  });
});
