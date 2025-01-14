import { z } from "zod";

const userSchema = z.object({
  name: z.string()
    .min(3, { message: "O nome precisa de 3 caracteres" })
    .transform(name => name.toLowerCase()),
  age: z.number().min(18, { message: "A idade precisa ser maior ou igual a 18" }),
})

type User = z.infer<typeof userSchema>

function getUserInfo(user: User): void {
  const { name, age } = userSchema.parse(user)

  console.log(`Nome: ${name}, Idade: ${age}`)
}

getUserInfo({
  name: "Iago",
  age: 18
})