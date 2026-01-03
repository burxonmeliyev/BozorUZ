import { Button } from '@/components/ui/button';
import type { Category } from '@/types/product';

interface CategoryFilterProps {
  selected: Category;
  onSelect: (category: Category) => void;
}

const CATEGORIES: { value: Category; label: string }[] = [
  { value: 'all', label: 'Hammasi' },
  { value: 'elektronika', label: 'Elektronika' },
  { value: 'kiyim', label: 'Kiyim-kechak' },
  { value: 'oziq-ovqat', label: 'Oziq-ovqat' },
  { value: 'uy-jihozlari', label: 'Uy jihozlari' },
  { value: 'sport', label: 'Sport' },
];

export function CategoryFilter({ selected, onSelect }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {CATEGORIES.map(category => (
        <Button
          key={category.value}
          variant={selected === category.value ? 'default' : 'outline'}
          onClick={() => onSelect(category.value)}
          className={selected === category.value ? 'btn-primary' : ''}
        >
          {category.label}
        </Button>
      ))}
    </div>
  );
}
