import Navbar from "@/components/shared/Navbar";


const PublicLayoutPage = ({ children }) => {
  return (
    <div>
      <Navbar></Navbar>
      <main>{children}</main>
    </div>
  );
};

export default PublicLayoutPage;
