import { SignupForm } from "../components/signup-form";

export default function SignupPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary flex size-8 items-center justify-center rounded-md">
              <img
                src="https://i.ibb.co/t617Vtf/logo-small.png"
                alt="logo-small"
              />
            </div>
            Qubic Home
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <SignupForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="https://i.ibb.co/27tw29fn/signup-page.png"
          alt="Image"
          className="absolute bg-white inset-0 h-full w-full object-fill dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
