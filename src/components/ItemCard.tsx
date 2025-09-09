import { JSX } from "react";
import Image from "next/image";
import { Item } from "@/lib/types";

interface ItemCardProps {
  item: Item;
}

function getTagColor(tag: string): string {
  const specialTags: { [key: string]: string } = {
    // Special tags
    'hacking': 'bg-black text-green-400 border-green-600',
    'radio': 'bg-white text-black border-red-400 border-2 border-dashed shadow-md shadow-red-400/10',

    // Status tags
    'featured': 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-orange-600 animate-bounce',
    'exclusive': 'bg-gradient-to-r from-purple-500 to-pink-500 text-white border-purple-600',
    'limited': 'bg-black text-white border-gray-800',
    'new': 'bg-green-500 text-white border-green-600',
    'hot': 'bg-red-500 text-white border-red-600 animate-pulse',
    'sale': 'bg-orange-500 text-white border-orange-600',
    
    // Branded tags
    'hackclub': 'bg-red-500 text-white border-red-600 shadow-lg shadow-red-500/25',
  }
  
  // Check if it's a special tag first
  if (specialTags[tag.toLowerCase()]) {
    return specialTags[tag.toLowerCase()]
  }
  
  // Default style for regular tags
  return 'bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100'
}

export default function ItemCard({ item }: ItemCardProps): JSX.Element {
  return (
    <div className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
      {item.image_url && (
        <div className="relative overflow-hidden">
          <Image
            src={item.image_url}
            alt={item.name || "Product image"}
            className="w-full h-auto py-2 px-2 object-cover group-hover:scale-105 transition-transform duration-300"
            width={400}
            height={100}
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
                className={`px-3 py-1 rounded-full text-sm font-medium border transition-all duration-200 hover:scale-105 ${getTagColor(tag)}`}
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