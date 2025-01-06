import Link from "next/link";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 p-4 border-b bg-background">
      <div className="flex justify-between max-w-[430px] mx-auto w-full">
        <Link href={"/"}>Instagram</Link>
        <Link href={"/create"}>+</Link>
      </div>
    </header>
  );
};
