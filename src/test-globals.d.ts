declare function describe(name: string, suite: () => void): void;
declare function it(name: string, test: () => void): void;
declare function expect(value: unknown): { toContain(expected: unknown): void; not: { toContain(expected: unknown): void }; toBe(expected: unknown): void };
