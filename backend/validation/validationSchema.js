import zod from 'zod';

const registerSchema = zod.object({
  username : zod.string(),
  password : zod.string().min(5),
  isAdmin : zod.boolean()
});

const signinSchema = zod.object({
  username : zod.string(),
  password : zod.string().min(5)
})

export {
  registerSchema,
  signinSchema
}