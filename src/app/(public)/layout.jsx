import Footer from "@/components/shared/footer/Footer";
import Navbar from "@/components/shared/nav/Navbar";

const PublicLayoutPage = ({ children }) => {
  return (
    <section>
      <Navbar></Navbar>
      {children}
      <Footer></Footer>
    </section>
  );
};

export default PublicLayoutPage;
