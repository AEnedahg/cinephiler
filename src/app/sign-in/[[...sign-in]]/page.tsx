import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full p-8 bg-white rounded-lg">
        <SignIn
          path="/sign-in"
          routing="path"
          signUpUrl="/sign-up"
          appearance={{
            elements: {
              rootBox: "w-full",
              card: "shadow-none w-full",
              headerTitle: "text-indigo-600",
              headerSubtitle: "text-gray-600",
              socialButtonsBlockButton: "border-gray-300",
              footerActionText: "text-gray-600",
              footerActionLink: "text-indigo-600 hover:text-indigo-800",
            },
          }}
        />
      </div>
    </div>
  );
}
