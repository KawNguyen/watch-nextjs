
export const googleLogin = () => {
  window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/auth/google/login`;
};

