expect.extend({
  toMatchContentState(received, expected) {
    const { blocks: rBlocks, entityMap: rEntityMap } = received;
    const { blocks: eBlocks, entityMap: eEntityMap } = expected;
    expect(rBlocks.length).toBe(eBlocks.length);

    rBlocks.forEach((block, i) => {
      const { key: key1, ...rest1 } = block;
      const { key: key2, ...rest2 } = eBlocks[i];
      expect(rest1).toEqual(rest2);
    });

    expect(rEntityMap).toEqual(eEntityMap);
    return { pass: true };
  },
});
