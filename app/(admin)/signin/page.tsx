import SignInCard from "@/components/SignInCard";

const SignIn = () => {
  const demoEmail = process.env.DEMO_ACCOUNT_EMAIL;
  const demoPassword = process.env.DEMO_ACCOUNT_PASSWORD;

  return (
    <main className="w-full min-h-screen flex flex-col items-center px-4 pt-12">
      <SignInCard demoEmail={demoEmail} demoPassword={demoPassword} />
    </main>
  );
};

export default SignIn;
