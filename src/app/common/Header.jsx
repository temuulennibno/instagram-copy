import Link from "next/link";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 flex justify-between p-4 border-b bg-background">
      <Link href={"/"}>Instagram</Link>
      <Link href={"/create"}>+</Link>
    </header>
  );
};
