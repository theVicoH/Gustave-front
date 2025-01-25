"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { FormInput } from "@/components/ui/form-input";

const forgotPasswordSchema = z.object({
  email: z.string().email("Veuillez entrer une adresse email valide"),
});

type FormData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const [isPending, setIsPending] = useState(false);

  const form = useForm<FormData>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsPending(true);
    try {
      toast.success("Email de réinitialisation envoyé !");
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
        <div className="text-2xl font-bold">Mot de passe oublié ?</div>
        <p className="text-sm text-muted-foreground">
          Entrez votre email et nous vous enverrons les instructions
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

          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isPending ? "Envoi en cours..." : "Envoyer les instructions"}
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
