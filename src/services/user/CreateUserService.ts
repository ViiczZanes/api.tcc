import { hash } from 'bcrypt';
import { z } from 'zod'
import prismaClient from '../../prisma'

const UserSchema = z.object({
    name: z.string(),
    email: z.string()
        .email()
        .transform(email => email.toLocaleLowerCase()),
    password: z.string(),
})


type UserRequest = z.infer<typeof UserSchema>

const CreateUserService = {
    async execute(user: UserRequest) {
        const { name, email, password } = UserSchema.parse(user)

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email
            }
        })

        if (userAlreadyExists) throw new Error('Email já Cadastrado')

        const hashedPassword = await hash(password, 10)

        const createdUser = await prismaClient.user.create({
            data: {
                name,
                email,
                password: hashedPassword
            },
            select: {
                id: true,
                name: true,
                email: true,
                role: true
            }
        })

        return createdUser

    }
}

export { CreateUserService }