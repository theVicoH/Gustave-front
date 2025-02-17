"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";

import { Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { FormInput } from "@/components/ui/form-input";
import { register } from "@/services/auth-service";
import { registerSchema } from "@/lib/validations/auth";

type FormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsPending(true);
    try {
      await register({
        name: data.name,
        email: data.email,
        password: data.password,
        password_confirmation: data.confirmPassword,
      });
      toast.success("Compte créé avec succès !");
      form.reset();
      router.push("/auth/login");
    } catch (error: any) {
      console.error("Erreur lors de l'inscription:", error);
      toast.error(error.message || "Erreur lors de la création du compte");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader className="space-y-1">
        <div className="text-2xl font-bold">Créer un compte</div>
        <p className="text-sm text-muted-foreground">
          Entrez vos informations pour créer un compte
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormInput
            id="name"
            label="Nom"
            type="text"
            placeholder="John Doe"
            register={form.register("name")}
            error={form.formState.errors.name?.message}
          />

          <FormInput
            id="email"
            label="Email"
            type="email"
            placeholder="exemple@email.com"
            register={form.register("email")}
            error={form.formState.errors.email?.message}
          />

          <FormInput
            id="password"
            label="Mot de passe"
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

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Création en cours..." : "Créer un compte"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Déjà un compte ?{" "}
            <Link href="/auth/login" className="text-primary hover:underline">
              Se connecter
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
