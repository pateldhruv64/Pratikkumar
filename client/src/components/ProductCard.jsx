import React from 'react';
import { ExternalLink, MessageCircle } from 'lucide-react';

const ProductCard = ({ product }) => {
    return (
        <div className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 flex flex-col h-full transform hover:-translate-y-1">
            {/* Image Section - Always White Background for Product Visibility */}
            <div className="h-64 bg-white flex items-center justify-center p-6 relative">
                <img
                    src={
                        product.image.startsWith('http')
                            ? product.image
                            : `${import.meta.env.VITE_API_URL}${product.image}`
                    }
                    alt={product.name}
                    loading="lazy"
                    className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-110"
                />

                {/* Category Badge */}
                {product.category && (
                    <span className="absolute top-3 right-3 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-xs font-bold px-3 py-1 rounded-full shadow-sm z-10">
                        {product.category}
                    </span>
                )}
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow relative">
                {/* Decorative gradient line */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {product.name}
                </h3>

                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 mb-6 flex-grow">
                    {product.description}
                </p>

                {/* Actions */}
                <div className="mt-auto flex flex-col sm:flex-row gap-3">
                    {product.brochure && (
                        <a
                            href={
                                product.brochure.startsWith('http')
                                    ? product.brochure
                                    : `${import.meta.env.VITE_API_URL}${product.brochure}`
                            }
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`Download brochure for ${product.name}`}
                            className="flex-1 flex items-center justify-center gap-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 px-4 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors text-sm font-medium"
                        >
                            <ExternalLink size={16} />
                            Brochure
                        </a>
                    )}

                    <a
                        href={`https://wa.me/916353159657?text=Hello, I am interested in ${encodeURIComponent(product.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Enquire about ${product.name} on WhatsApp`}
                        className="flex-1 flex items-center justify-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg hover:bg-green-800 transition-colors shadow-md hover:shadow-lg text-sm font-medium"
                    >
                        <MessageCircle size={16} />
                        Enquire
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
