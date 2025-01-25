import * as z from "zod";

export const registerSchema = z
  .object({
    email: z.string().email({
      message: "Veuillez entrer une adresse email valide.",
    }),
    password: z
      .string()
      .min(8, {
        message: "Le mot de passe doit contenir au moins 8 caractères",
      })
      .regex(/[A-Z]/, {
        message: "Le mot de passe doit contenir au moins une majuscule",
      })
      .regex(/[0-9]/, {
        message: "Le mot de passe doit contenir au moins un chiffre",
      })
      .regex(/[^A-Za-z0-9]/, {
        message: "Le mot de passe doit contenir au moins un caractère spécial",
      }),
    confirmPassword: z.string(),
    terms: z.boolean().refine((data) => data === true, {
      message: "Vous devez accepter les conditions d'utilisation",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });
