import * as z from 'zod';

const User = z.object({
  name: z.string(),
});

// some untrusted data...
const input = {
  /* stuff */
  name: 'John Doe',
};

// the parsed result is validated and type safe!
const data = User.parse(input);

// so you can use it with confidence :)
console.log(data.name);

const a = z.string().length(2).describe('Two-letter state code (e.g. CA, NY)');
console.log(JSON.stringify(a));
