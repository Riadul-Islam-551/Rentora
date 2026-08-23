import Navbar from "@/components/shared/nav/Navbar";


const PublicLayoutPage = ({ children }) => {
  return (
    <section >
      <Navbar></Navbar>
      <main>{children}</main>
    </section>
  );
};

export default PublicLayoutPage;
