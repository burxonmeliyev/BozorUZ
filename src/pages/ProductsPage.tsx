import { useState, useMemo } from 'react';
import { ProductCard } from '@/components/features/ProductCard';
import { CategoryFilter } from '@/components/features/CategoryFilter';
import { PRODUCTS } from '@/constants/products';
import type { Category, SortOption } from '@/types/product';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@/components/ui/label';

export function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('all');
  const [sortBy, setSortBy] = useState<SortOption>('popular');

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = PRODUCTS;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Sort
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case 'price-low':
          return a.price - b.price;
        case 'price-high':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
        default:
          return b.reviews - a.reviews;
      }
    });

    return sorted;
  }, [selectedCategory, sortBy]);

  return (
    <div className="container-custom py-8">
      <h1 className="text-4xl font-bold mb-8">Mahsulotlar</h1>

      {/* Filters */}
      <div className="mb-8 space-y-6">
        <div>
          <Label className="text-base mb-3 block">Kategoriya</Label>
          <CategoryFilter
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />
        </div>

        <div className="flex items-center space-x-4">
          <Label htmlFor="sort" className="text-base">
            Saralash:
          </Label>
          <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
            <SelectTrigger id="sort" className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Mashhurlik bo'yicha</SelectItem>
              <SelectItem value="price-low">Narxi: Arzondan qimmadga</SelectItem>
              <SelectItem value="price-high">Narxi: Qimmatdan arzonga</SelectItem>
              <SelectItem value="rating">Reyting bo'yicha</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredAndSortedProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {filteredAndSortedProducts.length === 0 && (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground">
            Hech qanday mahsulot topilmadi
          </p>
        </div>
      )}
    </div>
  );
}
