import PropertyCard from "@/components/owner/property/PropertyCard";
import PublicPropertyCard from "./PublicPropertyCard";

const PublicPropertyGrid = ({ properties }) => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
      {properties.map((property) => (
        <PublicPropertyCard key={property._id} property={property} />
      ))}
    </div>
  );
};

export default PublicPropertyGrid;
