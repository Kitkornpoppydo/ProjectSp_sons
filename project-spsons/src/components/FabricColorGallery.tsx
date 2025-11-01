import React, { useEffect, useState } from 'react';
import { getAllProducts } from '../service/ProductService';
import { Product } from '../models/Product';
import { BASE_URL } from '../config';

export default function FabricColorGallery() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedMaterial, setSelectedMaterial] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null); 

  const materialMap: Record<string, string[]> = {
    'ม่านพับ': ['dimout', 'blackout'],
    'ม่านลอน': ['dimout', 'blackout'],
    'ม่านจีบ': ['dimout', 'blackout'],
    'ม่านม้วน': ['sunscreen'],
    'ฉากกั้นห้อง': ['pvc'],
    'มูลี่': ['ไม้'],
  };

  useEffect(() => {
    getAllProducts().then(setProducts);
  }, []);

  const curtainTypes = Array.from(new Set(products.map(p => p.categoryName)));

  const availableMaterials = selectedCategory
    ? materialMap[selectedCategory] ?? []
    : [];

  const availableColors = Array.from(
    new Set(
      products
        .filter(
          p =>
            p.categoryName === selectedCategory &&
            p.name === selectedMaterial
        )
        .map(p => p.color)
    )
  );

  const filtered = products.filter(p =>
    (!selectedCategory || p.categoryName === selectedCategory) &&
    (!selectedMaterial || p.name === selectedMaterial) &&
    (!selectedColor || p.color === selectedColor)
  );

  return (
    <div className="container mx-auto p-6 mt-40">
      <h1 className="text-3xl font-bold mb-6">เฉดสีผ้าม่าน</h1>

      {/* เลือกประเภทม่าน */}
      <div className="mb-4">
        <label className="block font-semibold mb-1">ประเภทม่าน</label>
        <select
          className="w-full border rounded px-3 py-2"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSelectedMaterial('');
            setSelectedColor('');
          }}
        >
          <option value="">-- เลือกม่าน --</option>
          {curtainTypes.map(name => (
            <option key={name} value={name}>{name}</option>
          ))}
        </select>
      </div>

   
      {selectedCategory && (
        <div className="mb-4">
          <label className="block font-semibold mb-1">วัสดุ</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={selectedMaterial}
            onChange={(e) => {
              setSelectedMaterial(e.target.value);
              setSelectedColor('');
            }}
          >
            <option value="">-- เลือกวัสดุ --</option>
            {availableMaterials.map(mat => (
              <option key={mat} value={mat}>{mat}</option>
            ))}
          </select>
        </div>
      )}

     
      {selectedMaterial && (
        <div className="mb-4">
          <label className="block font-semibold mb-1">สี</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={selectedColor}
            onChange={(e) => setSelectedColor(e.target.value)}
          >
            <option value="">-- เลือกสี --</option>
            {availableColors.map(color => (
              <option key={color} value={color}>{color}</option>
            ))}
          </select>
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="text-gray-500">ไม่มีข้อมูลสีผ้า</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {filtered.map(prod => (
            <div
              key={prod.id}
              className="border rounded overflow-hidden shadow hover:shadow-lg transition cursor-pointer"
              onClick={() => setSelectedProduct(prod)} 
            >
              <img
                src={`${BASE_URL}${prod.image}`}
                alt={prod.color}
                className="w-full h-64 object-cover"
              />
              <div className="p-2 text-center font-medium">{prod.color}</div>
            </div>
          ))}
        </div>
      )}

      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="bg-black rounded-lg p-6 max-w-md w-full relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-red-500 text-xl"
            >
              ✕
            </button>
            <img
              src={`${BASE_URL}${selectedProduct.image}`}
              alt={selectedProduct.color}
              className="w-full h-80 object-cover rounded mb-4"
            />
            <h2 className="text-xl font-semibold text-center mb-2">
              {selectedProduct.color}
            </h2>
            <p className="text-center text-white">
              วัสดุ: {selectedProduct.name}<br />
              ประเภทม่าน: {selectedProduct.categoryName}<br />
              ราคาผ้า: {selectedProduct.pricePerUnit} <span>{selectedProduct.unit}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
