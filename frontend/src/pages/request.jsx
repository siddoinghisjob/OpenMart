import { useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";

export default function ReqPost() {
  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const [cost, setCost] = useState();
  const [category, setCategory] = useState("electronics");
  const [condition, setCondition] = useState("new");
  const [number, setNumber] = useState();

  const { getAccessTokenSilently, user } = useAuth0();
  const [message, setMessage] = useState("Here");
  const [code, setCode] = useState();
  const obj = {
    name: name,
    email: user?.email,
    desc: desc,
    cost: cost,
    category: category,
    condition: condition,
    number: number,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = await getAccessTokenSilently();
    try {
      const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/req`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(obj),
      });
      const responseData = await response.json();
      setMessage(responseData.message);
      setCode(0);
    } catch (error) {
      setMessage(error.message);
      setCode(1);
    }
  };

  return (
    <div className="dark bg-gray-900 justify-center h-full items-center mt-auto min-h-screen p-6">
      <form className="max-w-2xl mx-auto bg-gray-800 rounded-lg shadow-md p-6 space-y-6">
        <h2 className="text-2xl font-bold text-white">Request for an item.</h2>
        <div className="flex flex-col gap-2">
          <label className="text-white" htmlFor="name">
            Item Name
          </label>
          <input
            className="bg-gray-700 w-full rounded-xl p-3 text-white"
            id="name"
            placeholder="Enter item name"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white" htmlFor="description">
            Description
          </label>
          <textarea
            className="bg-gray-700 w-full rounded-xl p-3 text-white"
            id="description"
            placeholder="Enter item description"
            onChange={(e) => setDesc(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-white" htmlFor="name">
            Price
          </label>
          <input
            className="bg-gray-700 w-full rounded-xl p-3 text-white"
            id="name"
            placeholder="Enter item name"
            onChange={(e) => setCost(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="text-white" htmlFor="category">
            Category
          </label>
          <select
            className="bg-gray-700 p-2 w-full rounded-xl text-white"
            id="category"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="electronics">Electronics</option>
            <option value="furniture">Furniture</option>
            <option value="clothing">Clothing</option>
            <option value="books">Books</option>
          </select>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="text-white" htmlFor="condition">
            Condition
          </label>
          <select
            className="bg-gray-700 p-2 w-full rounded-xl text-white"
            id="condition"
            onChange={(e) => setCondition(e.target.value)}
          >
            <option default value="new">New</option>
            <option value="like-new">Like New</option>
            <option value="used">Used</option>
            <option value="worn">Worn</option>
          </select>
        </div>
        <div className="flex flex-col gap-2 w-full">
          <label className="text-white" htmlFor="condition">
            Phone Number
          </label>
          <input
            className="bg-gray-700 w-full rounded-xl p-3 text-white"
            id="number"
            placeholder="Enter your number"
            onChange={(e) => setNumber(e.target.value)}
          />
        </div>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white p-2 rounded-lg"
        >
          Submit
        </button>

        <div className="w-full border p-5 py-2 rounded-xl bg-red-50 text-red-600 font-sans font-semibold border-red-600">
          {message}
        </div>
      </form>
    </div>
  );
}
