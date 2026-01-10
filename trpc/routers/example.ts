import { z } from 'zod';
import { publicProcedure, router } from '../init';

export const exampleRouter = router({
  getExampleData: publicProcedure.query(() => {
    return 'Lorem ipsum dolor sit amet';
  }),
  getExampleDataWithInput: publicProcedure.input(z.string()).query((opts) => {
    const { input } = opts;
    return `Input received: ${input}`;
  }),
});
