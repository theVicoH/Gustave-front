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
import { registerSchema } from "@/lib/validations/auth";
import { FormInput } from "@/components/ui/form-input";

type FormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      terms: false,
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsPending(true);
    try {
      toast.success("Compte créé avec succès !");
      form.reset();
    } catch (error) {
      toast.error("Une erreur est survenue");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader className="space-y-1">
        <div className="text-2xl font-bold">Hey, Hello 👋</div>
        <p className="text-sm text-muted-foreground">
          Entrez vos informations pour créer un compte
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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

          <div className="flex items-center space-x-2">
            <Checkbox id="terms" {...form.register("terms")} />
            <Label htmlFor="terms" className="text-sm">
              J'accepte les conditions d'utilisation
            </Label>
          </div>
          {form.formState.errors.terms && (
            <p className="text-sm text-red-500">
              {form.formState.errors.terms.message}
            </p>
          )}

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
