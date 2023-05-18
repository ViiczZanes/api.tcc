import { z } from "zod";
import { hash } from "bcrypt";
import prismaClient from "../../prisma";

const RoleEnum = z.enum(["admin", "garcom", "cozinha", "cliente", "caixa"]);
type RoleEnum = z.infer<typeof RoleEnum>;

const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(3),
  email: z.string().email().transform(email => email.toLowerCase()),
  role: RoleEnum,
  newPassword: z.string().optional(),
});

type UserProps = z.infer<typeof UserSchema>;

const UpdateUserService = {
  async execute(user: UserProps) {
    const { id, email, role, name, newPassword } = UserSchema.parse(user);

    const userExists = await prismaClient.user.findFirst({
      where: {
        id,
      },
    });

    if (!userExists) {
      throw new Error("User not found");
    }
    try {
      const updatedUser = await prismaClient.user.update({
        where: {
          id,
        },
        data: {
          name,
          email,
          role,
          ...(newPassword ? { password: await hash(newPassword, 10) } : {}),
        },
      });

      return updatedUser;

    } catch (error) {
      return error.message
    }
  },
};

export { UpdateUserService };
