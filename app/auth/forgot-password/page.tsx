import type { Metadata } from "next";
import ForgotPasswordForm from "@/app/components/auth/ForgotPasswordForm";
import Link from "next/link";

export const metadata: Metadata = {
  title: "CashTrackr - Olvidé el Password",
  description: "CashTrackr - Olvidé el Password ",
};

export default function ForgotPassworPage() {
  return (
    <>
      <h1 className="font-black text-6xl text-purple-950">
        ¿Olvidaste tu Contraseña?
      </h1>
      <p className="text-3xl font-bold">
        aquí puedes <span className="text-amber-500"> reestablecerla</span>
      </p>

      <ForgotPasswordForm />

      <nav className="mt-10  flex flex-col space-y-4">
        <Link href="/auth/login" className="text-center text-gray-500">
          ¿Ya tienes una Cuenta? Iniciar Sesión
        </Link>

        <Link href="/auth/register" className="text-center text-gray-500">
          No tienes una Cuenta? Crea una
        </Link>
      </nav>
    </>
  );
}
