import { InlineStorage } from './inline-storage';

describe('InlineStorage', () => {

  let instance;

  it('should use default value', () => {
    instance = new InlineStorage<number>('amir', 1);
    expect(instance.value).toBe(1);
    instance = new InlineStorage<number>('foo');
    expect(instance.value).toBeNull();
  });

  it('should save the value', () => {
    instance = new InlineStorage<boolean>('bar', false);
    expect(instance.value).toBeFalse();
    instance.update(true);
    const another = new InlineStorage<boolean>('bar', false);
    expect(instance.value).toBe(true);
    expect(another.value).toBe(true);
  });
});
