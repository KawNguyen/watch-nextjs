import { redirect } from "next/navigation";

interface PageProps {
  params: {
    brand: string;
  };
}

export default function Page({ params }: PageProps) {
  return redirect(`${params.brand}/watches`);
}
