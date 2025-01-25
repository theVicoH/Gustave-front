"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { FormInput } from "@/components/ui/form-input";

const resetPasswordSchema = z
  .object({
    password: z
      .string()
      .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    confirmPassword: z.string(),
    terms: z.boolean().refine((val) => val === true, {
      message: "Vous devez accepter les conditions d'utilisation",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Les mots de passe ne correspondent pas",
    path: ["confirmPassword"],
  });

type FormData = z.infer<typeof resetPasswordSchema>;

export function ResetPasswordForm() {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsPending(true);
    try {
      toast.success("Mot de passe réinitialisé avec succès !");
      form.reset();
    } catch (error) {
      toast.error("Une erreur est survenue");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Card className="w-full max-w-[450px]">
      <CardHeader className="space-y-1">
        <div className="text-2xl font-bold">Créer un nouveau mot de passe</div>
        <p className="text-sm text-muted-foreground">
          Entrez votre nouveau mot de passe
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            id="password"
            label="Nouveau mot de passe"
            isPassword
            register={form.register("password")}
            error={form.formState.errors.password?.message}
          />

          <FormInput
            id="confirmPassword"
            label="Confirmer le mot de passe"
            isPassword
            register={form.register("confirmPassword")}
            error={form.formState.errors.confirmPassword?.message}
          />

          <div className="flex items-center space-x-2">
            <Checkbox id="terms" {...form.register("terms")} />
            <Label htmlFor="terms" className="text-sm">
              Vous acceptez nos conditions d'utilisation
            </Label>
          </div>
          {form.formState.errors.terms && (
            <p className="text-sm text-red-500">
              {form.formState.errors.terms.message}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending
              ? "Réinitialisation..."
              : "Réinitialiser le mot de passe"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Retour à la{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              connexion
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
