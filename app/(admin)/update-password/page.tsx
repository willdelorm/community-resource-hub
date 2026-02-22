import UpdatePasswordForm from "@/components/UpdatePasswordForm";

const UpdatePassword = () => {
  return (
    <main className="w-full min-h-screen flex flex-col items-center px-4 pt-12">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-black uppercase text-center mb-1">
          Update Password
        </h1>
        <p className="text-center text-gray-500 mb-6">
          Enter a new password for your account.
        </p>

        <hr className="border-gray-200 mb-6" />

        <UpdatePasswordForm />
      </div>
    </main>
  );
};

export default UpdatePassword;
