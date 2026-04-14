import { Metadata } from "next";
import Link from "next/link";
import { AuthContent } from "@/components/auth/auth-content";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to your account",
};

export default function LoginPage() {
  const providers = ["credentials", "google"]; // Simple provider config
  const hasCredentials = providers.includes("credentials");
  const hasOnlyCredentials = providers.length === 1 && hasCredentials;

  return (
    <div className="container flex min-h-[calc(100vh-6rem)] flex-col items-center justify-center py-8">
      <div className="w-full max-w-sm space-y-4">
        <div className="text-center space-y-1">
          <h1 className="text-xl font-semibold">Sign In</h1>
          <p className="text-xs text-muted-foreground">
            {hasOnlyCredentials
              ? "Enter your credentials to access your account"
              : "Sign in with your preferred method"
            }
          </p>
        </div>
        <AuthContent providers={providers} mode="login" />
        {hasCredentials && (
          <p className="text-center text-xs text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="text-foreground hover:underline">Sign up</Link>
          </p>
        )}
      </div>
    </div>
  );
}