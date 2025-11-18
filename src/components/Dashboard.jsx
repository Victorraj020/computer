import React, { useState } from "react";
import Header from "./Header";
import B01 from '../assets/4070.png';
import B02 from '../assets/RTX4.png';
import B03 from '../assets/RTX3.png';
import B04 from '../assets/RTX2.png';
import B05 from '../assets/RTX1.png';
import B06 from '../assets/RTX0.png';
import B07 from '../assets/AMD.png';
import B08 from '../assets/AMD2.png';
import B09 from '../assets/M1.png';
import B10 from '../assets/M2.png';
import B11 from '../assets/M3.png';
import B12 from '../assets/M4.png';
import B13 from '../assets/I5.png';
import B14 from '../assets/I7.png';
import B15 from '../assets/I9.png';
import B16 from '../assets/I10.png';
import B17 from '../assets/R9.png';



export default function Dashboard() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortOrder, setSortOrder] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const products = [
    { id: 1, image: B01, name: "GEFORCE RTX 4070", category: "GPU", price: 1599, description: "The RTX 4070 features powerful performance with 12GB of GDDR6X memory, delivering incredible ray tracing and AI-enhanced gaming experience." },
    { id: 2, image: B02, name: "GEFORCE GTX 1080", category: "GPU", price: 1199, description: "The RTX 1080 offers superior gaming performance with advanced graphics processing, perfect for 1440p and 4K gaming." },
    { id: 10, image: B10, name: "Gigabyte Aorus Master B550M", category: "Motherboard", price: 299, description: "A premium motherboard with great expandability, ideal for overclocking and ultra-fast data transfer." },
    { id: 11, image: B11, name: "ASUS Motherboard AORUS ELITE V2", category: "Motherboard", price: 699, description: "Ryzen 9 7950X delivers unparalleled multi-core performance, making it perfect for content creators and heavy workloads." },
    { id: 12, image: B12, name: "MSI MAG WIFI MASTER B650M", category: "Motherboard", price: 649, description: "Intel Core i9-13900K provides industry-leading performance for gaming and content creation with 24 cores and 32 threads." },
    { id: 13, image: B13, name: "Intel i5 12400F", category: "CPU", price: 449, description: "Ryzen 7 7800X3D offers next-gen performance with 3D V-Cache, ideal for gaming and multitasking." },
    { id: 14, image: B14, name: "Intel i7 14700K", category: "CPU", price: 549, description: "Ryzen 7 7800X3D offers next-gen performance with 3D V-Cache, ideal for gaming and multitasking." },
    { id: 3, image: B03, name: "GEFORCE GTX 1650 EVGA ", category: "GPU", price: 999, description: "RTX 1650 XTX is an affordable GPU with great performance for mid-tier gaming and VR setups." },
    { id: 4, image: B04, name: "GEFORCE RTX AERO 3050Ti", category: "GPU", price: 799, description: "The RTX 3050Ti provides great performance in AAA titles and is perfect for gamers looking for quality at a reasonable price." },
    { id: 5, image: B05, name: "GigaByte RTX 3050", category: "GPU", price: 699, description: "GigaByte RTX 3050 offers amazing performance for modern games with great efficiency and energy savings." },
    { id: 6, image: B06, name: "MSI RTX 3050 SUPER  ", category: "GPU", price: 649, description: "The MSI RTX 1050 is a compact powerhouse ideal for entry-level gaming at 1080p resolution." },
    { id: 7, image: B07, name: "ASUS AMD RADEON RX6600XT ", category: "GPU", price: 449, description: "AMD RADEON 1 offers competitive pricing with great graphics performance for casual gamers." },
    { id: 8, image: B08, name: "ASUS AMD RADEON 580  ", category: "GPU", price: 349, description: "A budget-friendly AMD RADEON option providing solid performance for gaming and multimedia." },
    { id: 9, image: B09, name: "MSI MAG X650", category: "Motherboard", price: 329, description: "The MSI MEG X670E motherboard is designed for high-performance gaming systems with advanced cooling solutions and PCIe 5.0 support." },
    // { id: 10, image: B10, name: "Gigabyte Aorus Master B550M", category: "Motherboard", price: 299, description: "A premium motherboard with great expandability, ideal for overclocking and ultra-fast data transfer." },
    // { id: 11, image: B11, name: "ASUS Motherboard AORUS ELITE V2", category: "Motherboard", price: 699, description: "Ryzen 9 7950X delivers unparalleled multi-core performance, making it perfect for content creators and heavy workloads." },
    // { id: 12, image: B12, name: "MSI MAG WIFI MASTER B650M", category: "Motherboard", price: 649, description: "Intel Core i9-13900K provides industry-leading performance for gaming and content creation with 24 cores and 32 threads." },
    // { id: 13, image: B13, name: "Intel i5 12400F", category: "CPU", price: 449, description: "Ryzen 7 7800X3D offers next-gen performance with 3D V-Cache, ideal for gaming and multitasking." },
    // { id: 14, image: B14, name: "Intel i7 14700K", category: "CPU", price: 549, description: "Ryzen 7 7800X3D offers next-gen performance with 3D V-Cache, ideal for gaming and multitasking." },
    { id: 15, image: B15, name: "Intel CORE ULTRA 9 245K", category: "CPU", price: 649, description: "Ryzen 7 7800X3D offers next-gen performance with 3D V-Cache, ideal for gaming and multitasking." },
    { id: 16, image: B16, name: "Intel CORE I9 EXTREME", category: "CPU", price: 749, description: "Ryzen 7 7800X3D offers next-gen performance with 3D V-Cache, ideal for gaming and multitasking." },
    { id: 17, image: B17, name: "AMD Ryzen 9 7800X3D", category: "CPU", price: 749, description: "Ryzen 7 7800X3D offers next-gen performance with 3D V-Cache, ideal for gaming and multitasking." },
  ];

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter((product) => product.category === selectedCategory);

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOrder === "low-to-high") return a.price - b.price;
    if (sortOrder === "high-to-low") return b.price - a.price;
    return 0;
  });

  const openProductDescription = (product) => {
    setSelectedProduct(product);
  };

  const closeProductDescription = () => {
    setSelectedProduct(null);
  };

  return (
    <div style={{ backgroundColor: "#F5F5F5", minHeight: "100vh", paddingBottom: "50px", paddingTop: "75px" }}>
      <Header />
      <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginBottom: "20px" }}>
        <select
          onChange={(e) => setSelectedCategory(e.target.value)}
          style={{
            padding: "12px", fontSize: "16px", borderRadius: "8px", border: "1px solid #ddd", cursor: "pointer",
            background: "linear-gradient(145deg, #f1f1f1, #ffffff)", boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.1)"
          }}
        >
          <option value="All">All Components</option>
          <option value="GPU">GPU</option>
          <option value="CPU">CPU</option>
          <option value="Motherboard">Motherboard</option>
        </select>

        <select
          onChange={(e) => setSortOrder(e.target.value)}
          style={{
            padding: "12px", fontSize: "16px", borderRadius: "8px", border: "1px solid #ddd", cursor: "pointer",
            background: "linear-gradient(145deg, #f1f1f1, #ffffff)", boxShadow: "2px 2px 8px rgba(0, 0, 0, 0.1)"
          }}
        >
          <option value="">Sort By</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", justifyContent: "center", padding: "0 50px" }}>
        {sortedProducts.map((product) => (
          <div
            key={product.id}
            onClick={() => openProductDescription(product)}
            style={{
              backgroundColor: "#fff", borderRadius: "10px", padding: "15px", textAlign: "center", transition: "transform 0.3s ease, box-shadow 0.3s ease",
              boxShadow: "0 4px 8px rgba(0,0,0,0.1)", cursor: "pointer"
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <img
              src={product.image}
              alt={product.name}
              style={{
                width: "250px", height: "250px", objectFit: "cover", borderRadius: "8px", marginBottom: "15px"
              }}
            />
            <h3 style={{ margin: "10px 0", fontSize: "18px", fontWeight: "bold" }}>{product.name}</h3>
            <p style={{ fontSize: "16px", fontWeight: "bold", color: "#007BFF" }}>${product.price}</p>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div
          style={{
            position: "fixed", top: "0", left: "0", width: "100%", height: "100%", backgroundColor: "rgba(0,0,0,0.6)", display: "flex", justifyContent: "center",
            alignItems: "center", zIndex: "1000"
          }}
          onClick={closeProductDescription}
        >
          <div
            style={{
              backgroundColor: "#fff", borderRadius: "15px", padding: "30px", maxWidth: "600px", minWidth: "400px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)"
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>{selectedProduct.name}</h2>
            <p style={{ fontSize: "18px", color: "#555" }}>{selectedProduct.description}</p>
            <button
              onClick={closeProductDescription}
              style={{
                padding: "10px 20px", fontSize: "16px", backgroundColor: "#007BFF", color: "#fff", border: "none", borderRadius: "5px", cursor: "pointer",
                marginTop: "20px"
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
