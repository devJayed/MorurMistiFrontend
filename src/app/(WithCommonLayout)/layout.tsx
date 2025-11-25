import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import Navbar2 from "@/components/shared/Navbar2";

const CommonLayout = async ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <main className="min-h-screen mt-20">{children}</main>
      <Footer />
    </>
  );
};

export default CommonLayout;
