import { JSX } from "react";
import Image from "next/image";
import { Item } from "@/lib/types";

interface ItemCardProps {
  item: Item;
}

export default function ItemCard({ item }: ItemCardProps): JSX.Element {
  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {item.featured && (
        <div className="bg-gradient-to-r from-orange-400 to-gray-900 text-white px-3 py-1 text-sm font-semibold">
          ⭐ Featured
        </div>
      )}

      {item.image_url && (
        <div className="relative overflow-hidden">
          <Image
            src={item.image_url}
            alt={item.name || "Product image"}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            width={400}
            height={200}
          />
        </div>
      )}

      <div className="p-6">
        <h2 className="text-xl font-bold mb-2 text-gray-900 line-clamp-2">
          {item.name}
        </h2>

        <p className="text-gray-600 mb-3 line-clamp-2">{item.description}</p>

        <p className="text-2xl font-bold text-green-600 mb-4">{item.price}</p>

        {item.tags && item.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {item.tags.map((tag, index) => (
              <span
                key={index}
                className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}

        {item.external_link && (
          <a
            href={item.external_link}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 inline-block text-center font-medium"
          >
            Check it out →
          </a>
        )}
      </div>
    </div>
  );
}
