import { compare } from 'bcrypt';
import { z } from 'zod'
import { sign } from 'jsonwebtoken'
import prismaClient from '../../prisma'

const UserSchema = z.object({
    email: z.string()
        .email()
        .transform(email => email.toLocaleLowerCase()),
    password: z.string(),
})


type UserRequest = z.infer<typeof UserSchema>

const AuthUserService = {
    async execute(user: UserRequest) {

        const { email, password } = UserSchema.parse(user)

        const userAlreadyExists = await prismaClient.user.findFirst({
            where: {
                email
            }
        })

        if (!userAlreadyExists) throw new Error('Usuário/Senha Incorreto')

        const passwordMatch = await compare(password, userAlreadyExists.password)

        if (!passwordMatch) throw new Error('Usuário/Senha Incorreto')

        const token = sign({
            name: userAlreadyExists.name,
            email: userAlreadyExists.email,
            role: userAlreadyExists.role
        }, process.env.SECRET_JWT as string,
            {
                subject: userAlreadyExists.id,
                expiresIn: '30d'
            })

        return {
            id: userAlreadyExists.id,
            name: userAlreadyExists.name,
            email: userAlreadyExists.email,
            role: userAlreadyExists.role,
            token
        }


    }
}

export { AuthUserService }