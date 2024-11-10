import { SignIn } from "@clerk/clerk-react";

export default function SignInPage() {
  return (
    <div className="h-screen flex items-center justify-center">
      <SignIn 
        path="/sign-in"
        afterSignInUrl="/"
        routing="path"
        appearance={{
          elements: {
            footerAction: "hidden",
            footer: "hidden"
          }
        }}
      />
    </div>
  );
}