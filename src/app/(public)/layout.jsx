import Navbar from "@/components/shared/Navbar";


const PublicLayoutPage = ({ children }) => {
  return (
    <section >
      <Navbar></Navbar>
      <main>{children}</main>
    </section>
  );
};

export default PublicLayoutPage;
