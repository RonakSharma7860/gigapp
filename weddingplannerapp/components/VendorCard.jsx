'use client'
export default VendorCard = ({ vendor, onSelect }) => {
    const [isSelected, setIsSelected] = useState(false);

    const handleCheckboxChange = () => {
        setIsSelected(!isSelected);
        onSelect(vendor, isSelected);
    };

    return (
        <div onClick={handleCheckboxChange} className={`p-4 border-4 rounded-lg flex flex-col w-max h-max items-start justify-center gap-1 ${isSelected ? 'border-blue-500' : 'border-gray-500'}`}>
            <h3 className="text-lg self-center font-bold pb-1 mb-2 px-2 border-b-2 border-black">{vendor.name}</h3>
            <p className="text-gray-800 font-semibold">₹{vendor.quote}</p>
            <p className="text-gray-500">#{vendor.category}</p>
            <p className="text-gray-500">{vendor.contact}</p>
        </div>
    );
};