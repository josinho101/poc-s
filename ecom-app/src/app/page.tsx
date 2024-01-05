import { Product } from "@/models/product";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const getProduts = async () => {
    const result = await fetch("http://localhost:3000/api/v1/products");
    const products: Product[] = await result.json();
    return products;
  };

  const data = await getProduts();

  return (
    <main className="h-screen p-2">
      <div className="mb-3 text-2xl">
        <Link href="/">Home</Link>
      </div>
      <div className="w-full flex flex-wrap">
        {data.map((p) => {
          return (
            <div className="p-2 mr-2 mb-2 w-64 border border-gray-300 rounded-md">
              <Image
                src={p.image}
                alt={p.manufacturer}
                width={300}
                height={250}
              />
              <div className="pt-2 h-44 w-full">
                <p className="font-bold text-xl">{p.manufacturer}</p>
                <p className="font-bold">₹{p.price}</p>
                <div>{p.title}</div>
              </div>
              <div className="mt-2">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                  ADD TO CART
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
