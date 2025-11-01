import React, { useState } from "react";
import {
  EstimateItem,
  EstimatePreviewResponse,
  CustomerInfo,
} from "../models/EstimateModels";
import { previewEstimate, createEstimateOrder } from "../service/EstimateOrderService";

const defaultItem = { productId: 1, width: 0, height: 0 };

const productOptions = [
  { id: 4, name: "มูลี่" },
  { id: 5, name: "ม่านพับ" },
  { id: 6, name: "ม่านลอน" },
  { id: 7, name: "ม่านม้วน" },
  { id: 8, name: "ม่านจีบ" },
  { id: 9, name: "ฉากกลั้นห้อง" },
];

export function EstimateForm() {
  const [items, setItems] = useState<EstimateItem[]>([defaultItem]);
  const [preview, setPreview] = useState<EstimatePreviewResponse | null>(null);
  const [showCustomerForm, setShowCustomerForm] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    customerAddress: "",
  });
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState<number | null>(null);


  const addItem = () => {
    setItems([...items, { productId: 1, width: 0, height: 0 }]);
  };

  const removeItem = (index: number) => {
    if (items.length <= 1) return; 
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const updateItem = (index: number, field: keyof EstimateItem, value: any) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const [showModal, setShowModal] = useState(false);

  const handlePreview = async () => {
    try {
      setLoading(true);
      const data = { items };
      const result = await previewEstimate(data);
      setPreview(result);
      setShowModal(true); 
    } catch (error: any) {
      alert("เกิดข้อผิดพลาดในการคำนวณราคา");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitOrder = async () => {
    if (!customerInfo.customerName || !customerInfo.customerPhone) {
      alert("กรุณากรอกชื่อและเบอร์โทร");
      return;
    }
    try {
      setLoading(true);
      const orderRequest = {
        ...customerInfo,
        items,
      };
      const response = await createEstimateOrder(orderRequest);
      setOrderId(response.orderId);
    } catch (error) {
      alert("เกิดข้อผิดพลาดในการบันทึกคำสั่งซื้อ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-blue-950 px-10 py-40 text-white">
        <h1 className="text-center text-5xl font-bold mt-15 mb-4">
          ฟอร์มคำนวณราคา
        </h1>
      </div>
      <div className="p-4 max-w-lg mx-auto mt-10">
        {/* รายการสินค้า */}
        {items.map((item, i) => (
          <div key={i} className="mb-6 bg-white">
            <label className="block mb-2 font-semibold text-gray-700">รายการที่ {i + 1}</label>

            <select
              className="border-b border-gray-400 focus:outline-none focus:border-blue-500 bg-transparent px-1 py-2 w-full mb-4"
              value={item.productId}
              onChange={(e) => updateItem(i, "productId", Number(e.target.value))}
            >
              {productOptions.map((p) => (
                <option key={p.id} value={p.id}>{p.name}</option>
              ))}
            </select>

            <div className="flex gap-4">
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="กว้าง (เมตร)"
                className="w-1/2 border-b border-gray-400 focus:outline-none focus:border-blue-500 bg-transparent py-2"
                value={item.width || ""}
                onChange={(e) => updateItem(i, "width", parseFloat(e.target.value))}
              />
              <input
                type="number"
                step="0.01"
                min="0"
                placeholder="สูง (เมตร)"
                className="w-1/2 border-b border-gray-400 focus:outline-none focus:border-blue-500 bg-transparent py-2"
                value={item.height || ""}
                onChange={(e) => updateItem(i, "height", parseFloat(e.target.value))}
              />
            </div>

            {items.length > 1 && (
              <button className="mt-2 text-red-600 hover:underline text-sm" onClick={() => removeItem(i)}>
                ลบรายการนี้
              </button>
            )}
          </div>
        ))}


        <div className="flex gap-4 justify-center">
          <button
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            onClick={addItem}
          >
            เพิ่มรายการสินค้า
          </button>
          <button
            className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-950"
            onClick={handlePreview}
            disabled={loading}
          >
            คำนวณราคา
          </button>
        </div>

        {showModal && preview && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
              <h2 className="text-xl font-bold mb-4">สรุปราคา</h2>
              <p>ราคาวัสดุ: {preview.totalFabricPrice.toLocaleString()} บาท</p>
              <p>ค่าแรง: {preview.totalLaborPrice.toLocaleString()} บาท</p>
              <p className="font-bold mt-2">รวมทั้งหมด: {preview.totalPrice.toLocaleString()} บาท</p>

              <div className="mt-6 flex justify-end space-x-2">
                <button
                  onClick={() => {
                    setShowModal(false);
                    setShowCustomerForm(true);
                  }}
                  className="bg-blue-900 text-white px-4 py-2 rounded hover:bg-blue-950"
                >
                  สนใจ สั่งซื้อ
                </button>
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded bg-red-600 text-white"
                >
                  ปิด
                </button>
              </div>
            </div>
          </div>
        )}

        {/* ฟอร์มกรอกข้อมูลลูกค้า */}
        {showCustomerForm && (
          <div className="mt-6 p-6 border rounded bg-white shadow">
            <h2 className="text-xl font-semibold mb-4">ข้อมูลลูกค้า</h2>
            <div className="grid grid-cols-1 gap-3">
              <input
                type="text"
                placeholder="ชื่อ-นามสกุล"
                className="border px-3 py-2 rounded"
                value={customerInfo.customerName}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, customerName: e.target.value })
                }
              />
              <input
                type="tel"
                placeholder="เบอร์โทร"
                className="border px-3 py-2 rounded"
                value={customerInfo.customerPhone}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, customerPhone: e.target.value })
                }
              />
              <input
                type="email"
                placeholder="อีเมล "
                className="border px-3 py-2 rounded"
                value={customerInfo.customerEmail}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, customerEmail: e.target.value })
                }
              />
              <textarea
                placeholder="ที่อยู่"
                className="border px-3 py-2 rounded"
                value={customerInfo.customerAddress}
                onChange={(e) =>
                  setCustomerInfo({ ...customerInfo, customerAddress: e.target.value })
                }
              />
              <button
                className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 mt-2"
                onClick={handleSubmitOrder}
                disabled={loading}
              >
                ยืนยัน
              </button>
            </div>
          </div>
        )}

        {orderId !== null && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-lg text-center max-w-md w-full">
              <h2 className="text-2xl font-bold mb-4">ขอบคุณที่สนใจผ้าม่านร้านเรา</h2>
              <button
                onClick={() => {
                  setOrderId(null);
                  setItems([defaultItem]);
                  setPreview(null);
                  setShowCustomerForm(false);
                  setCustomerInfo({
                    customerName: "",
                    customerPhone: "",
                    customerEmail: "",
                    customerAddress: "",
                  });
                }}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                กลับไปหน้าฟอร์ม
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

