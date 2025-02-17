"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { FormInput } from "@/components/ui/form-input";
import { login } from "@/services/auth-service";

const loginSchema = z.object({
  email: z.string().email("Veuillez entrer une adresse email valide"),
  password: z.string().min(1, "Le mot de passe est requis"),
});

type FormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const form = useForm<FormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsPending(true);
    try {
      await login(data);
      toast.success("Connexion réussie !");
      form.reset();
      router.push("/dashboard");
    } catch (error: any) {
      console.error("Erreur lors de la connexion:", error);
      toast.error(error.message || "Erreur lors de la connexion");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <Card className="w-full max-w-[400px]">
      <CardHeader className="space-y-1">
        <div className="text-2xl font-bold">Salut, Connecte toi 👋</div>
        <p className="text-sm text-muted-foreground">
          Entrez vos informations pour vous connecter
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

{/*           <div className="flex justify-end">
            <Link
              href="/auth/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Mot de passe oublié ?
            </Link>
          </div> */}

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Connexion en cours..." : "Se connecter"}
          </Button>

          <p className="text-center text-sm text-muted-foreground">
            Pas encore de compte ?{" "}
            <Link
              href="/auth/register"
              className="text-primary hover:underline"
            >
              Créer un compte
            </Link>
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
