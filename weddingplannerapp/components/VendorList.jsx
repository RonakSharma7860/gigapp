'use client'
import VendorCard from "./VendorCard";

export default VendorList = ({ vendors, onSelect }) => {
    return (
        <div className="flex w-full h-max flex-wrap justify-start items-center gap-5">
            {vendors.map((vendor) => (
                <VendorCard
                    key={vendor.name}
                    vendor={vendor}
                    onSelect={onSelect}
                />
            ))}
        </div>
    );
};