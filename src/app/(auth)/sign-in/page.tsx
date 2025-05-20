import { AuthForm } from "@/components/auth-form";

const page = () => {

  return (
    <AuthForm
      mode="signin"
      onSubmit={(data) => console.log(data)}
      className="w-full max-w-[400px] mx-auto"
    />
  );
};

export default page;
