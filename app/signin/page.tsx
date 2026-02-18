"use client";

import { Button } from "@/components/ui/button";

// TODO: Implement actual sign-in functionality and form fields for user input
const SignIn = () => {
  return (
    <main className="w-full">
      <section className="flex justify-center items-center py-12">
        <h1 className={`text-4xl font-black uppercase text-center filter`}>
          Sign In
        </h1>
      </section>
      <div className="flex flex-col">
        <main className=" text-black flex-1 flex flex-col p-6 gap-6">
          <div>
            <div className="flex flex-col">
              <h2 className="mx-auto text-4xl font-medium mb-1">
                Please sign in below:
              </h2>
              <p className="mx-auto mb-3">Please enter your details.</p>
            </div>
            <hr className="border-gray-500" />
          </div>
          <Button>
            Log in
          </Button>
        </main>
      </div>
    </main>
  );
};

export default SignIn;
