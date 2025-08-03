
import { useState } from "react";

export default function Orders() {
  const [data, setData] = useState([
    { id: 1, order: "#12512B", date: "May 5, 4:20 PM", customer: "Tom Anderson", payed: "Paid", orderStatus: "Ready", total: 49.90 },
    { id: 2, order: "#12523C", date: "May 5, 4:15 PM", customer: "Jayden Walker", payed: "Paid", orderStatus: "Ready", total: 34.36 },
  ]);

  const [search, setSearch] = useState("");
  const [form, setForm] = useState({ id: null, order: "", date: "", customer: "", payed: "Pending", orderStatus: "Ready", total: "" });

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleEdit = (item) => {
    setForm(item);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.id) {
      setData(data.map((item) => (item.id === form.id ? form : item)));
    } else {
      setData([...data, { ...form, id: Date.now() }]);
    }
    setForm({ id: null, order: "", date: "", customer: "", payed: "Pending", orderStatus: "Ready", total: "" });
  };

  const filteredData = data.filter(
    (item) =>
      item.customer.toLowerCase().includes(search.toLowerCase()) ||
      item.order.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-5">
      {/* Поиск */}
      <div className="mb-4 flex justify-between">
        <input
          type="text"
          placeholder="Search..."
          className="border px-3 py-2 rounded-md w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Таблица */}
      <table className="w-full border-collapse shadow-sm rounded-lg overflow-hidden">
        <thead className="bg-gray-100 text-gray-600">
          <tr>
            <th className="p-3 text-left">Order</th>
            <th className="p-3 text-left">Date</th>
            <th className="p-3 text-left">Customer</th>
            <th className="p-3 text-left">Payment Status</th>
            <th className="p-3 text-left">Order Status</th>
            <th className="p-3 text-left">Total</th>
            <th className="p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map((item) => (
            <tr key={item.id} className="border-b last:border-0">
              <td className="p-3">{item.order}</td>
              <td className="p-3">{item.date}</td>
              <td className="p-3">{item.customer}</td>
              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    item.payed === "Paid"
                      ? "bg-green-100 text-green-700"
                      : "bg-gray-200 text-gray-600"
                  }`}
                >
                  {item.payed}
                </span>
              </td>
              <td className="p-3">
                <span
                  className={`px-3 py-1 rounded-md text-sm font-medium ${
                    item.orderStatus === "Ready"
                      ? "bg-orange-100 text-orange-700"
                      : item.orderStatus === "Shipped"
                      ? "bg-gray-400 text-white"
                      : "bg-blue-100 text-blue-700"
                  }`}
                >
                  {item.orderStatus}
                </span>
              </td>
              <td className="p-3">${item.total}</td>
              <td className="p-3 text-center">
                <button
                  className="text-blue-500 mr-2"
                  onClick={() => handleEdit(item)}
                >
                  ✏️
                </button>
                <button
                  className="text-red-500"
                  onClick={() => handleDelete(item.id)}
                >
                  🗑
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Форма добавления/редактирования */}
      <form onSubmit={handleSubmit} className="mt-5 p-4 border rounded-lg shadow-sm">
        <div className="flex gap-3 mb-3">
          <input
            className="border p-2 rounded w-full"
            placeholder="Order ID"
            value={form.order}
            onChange={(e) => setForm({ ...form, order: e.target.value })}
          />
          <input
            className="border p-2 rounded w-full"
            placeholder="Date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />
        </div>
        <div className="flex gap-3 mb-3">
          <input
            className="border p-2 rounded w-full"
            placeholder="Customer"
            value={form.customer}
            onChange={(e) => setForm({ ...form, customer: e.target.value })}
          />
          <input
            className="border p-2 rounded w-full"
            placeholder="Total"
            type="number"
            value={form.total}
            onChange={(e) => setForm({ ...form, total: e.target.value })}
          />
        </div>
        <div className="flex gap-3 mb-3">
          <select
            className="border p-2 rounded w-full"
            value={form.payed}
            onChange={(e) => setForm({ ...form, payed: e.target.value })}
          >
            <option>Paid</option>
            <option>Pending</option>
          </select>
          <select
            className="border p-2 rounded w-full"
            value={form.orderStatus}
            onChange={(e) => setForm({ ...form, orderStatus: e.target.value })}
          >
            <option>Ready</option>
            <option>Shipped</option>
            <option>Received</option>
          </select>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">
          {form.id ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
}
