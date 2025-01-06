import { Footer } from "./Footer";
import { Header } from "./Header";

export const MainLayout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="pt-20 pb-[54px]">{children}</main>
      <Footer />
    </>
  );
};
