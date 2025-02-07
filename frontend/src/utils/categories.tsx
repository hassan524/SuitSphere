import { useContext } from "react";
import AppContext from "@/context/context";

const useCategories = () => {
    const { IsSelectWomens } = useContext(AppContext);

    return IsSelectWomens
    ? [ // Women's Images
        { img: "/images/products/fc/shirt.jpg", label: "Tops", bg: "bg-pink-300", span: "xl:row-span-2 xl:col-span-1", type: "shirt", gender: 'men' },
        { img: "/images/products/fc/pant.jpg", label: "Pants", bg: "bg-pink-500", span: "xl:row-span-2 xl:col-span-1", type: "pants", gender: 'men' },
        { img: "/images/products/fc/sweater.jpg", label: "Sweaters", bg: "bg-pink-600", span: "xl:row-span-2 xl:col-span-1", type: "sweater", gender: 'men' },
        { img: "/images/products/fc/heels.jpg", label: "Heels", bg: "bg-pink-800", span: "xl:row-span-2 xl:col-span-1", type: "shoes", gender: 'men' }
    ]
    : [ // Men's Images
        { img: "/images/products/mc/shirt3.jpg", label: "Shirts", bg: "bg-blue-300", span: "xl:row-span-2 xl:col-span-1", type: "shirt", gender: 'women' },
        { img: "/images/products/mc/pants.jpg", label: "Pants", bg: "bg-blue-500", span: "xl:row-span-2 xl:col-span-1", type: "pants", gender: 'women' },
        { img: "/images/products/mc/sweaters.jpg", label: "Sweaters", bg: "bg-blue-600", span: "xl:row-span-2 xl:col-span-1", type: "sweater", gender: 'women' },
        { img: "/images/products/mc/shoes.jpg", label: "Shoes", bg: "bg-blue-800", span: "xl:row-span-2 xl:col-span-1", type: "shoes", gender: 'women' }
    ];
};

export default useCategories;
