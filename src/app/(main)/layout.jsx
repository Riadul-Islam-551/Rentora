import Navbar from "@/components/shared/nav/Navbar";
import Footer from "@/components/shared/footer/Footer";

export default function PublicLayout({ children }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">{children}</main>

      <Footer />
    </div>
  );
}
