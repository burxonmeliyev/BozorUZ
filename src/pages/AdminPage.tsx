import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent } from '@/components/ui/card';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from '@/hooks/use-toast';
import { PRODUCTS } from '@/constants/products';

export function AdminPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuthStore();
  const [products, setProducts] = useState(PRODUCTS);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: 'elektronika',
    image: '',
    rating: '4.5',
    reviews: '0',
    inStock: true,
  });

  useEffect(() => {
    if (!isAuthenticated || !user?.isAdmin) {
      toast({
        title: 'Ruxsat rad etildi',
        description: 'Ushbu sahifaga faqat administratorlar kira oladi',
        variant: 'destructive',
      });
      navigate('/');
    }
  }, [isAuthenticated, user, navigate, toast]);

  if (!user?.isAdmin) return null;

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category: 'elektronika',
      image: '',
      rating: '4.5',
      reviews: '0',
      inStock: true,
    });
    setEditingProduct(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      id: editingProduct || Date.now().toString(),
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      image: formData.image || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500',
      rating: parseFloat(formData.rating),
      reviews: parseInt(formData.reviews),
      inStock: formData.inStock,
    };

    if (editingProduct) {
      setProducts(products.map(p => p.id === editingProduct ? productData : p));
      toast({
        title: 'Yangilandi',
        description: 'Mahsulot muvaffaqiyatli yangilandi',
      });
    } else {
      setProducts([...products, productData]);
      toast({
        title: 'Qo\'shildi',
        description: 'Yangi mahsulot muvaffaqiyatli qo\'shildi',
      });
    }

    setIsDialogOpen(false);
    resetForm();
  };

  const handleEdit = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        category: product.category,
        image: product.image,
        rating: product.rating.toString(),
        reviews: product.reviews.toString(),
        inStock: product.inStock,
      });
      setEditingProduct(productId);
      setIsDialogOpen(true);
    }
  };

  const handleDelete = (productId: string) => {
    setProducts(products.filter(p => p.id !== productId));
    toast({
      title: 'O\'chirildi',
      description: 'Mahsulot muvaffaqiyatli o\'chirildi',
    });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m';
  };

  return (
    <div className="container-custom py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold mb-2">Admin Panel</h1>
          <p className="text-muted-foreground">
            Mahsulotlarni boshqarish va tahrirlash
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="btn-primary" onClick={resetForm}>
              <Plus className="mr-2 h-4 w-4" />
              Yangi Mahsulot
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>
                {editingProduct ? 'Mahsulotni Tahrirlash' : 'Yangi Mahsulot Qo\'shish'}
              </DialogTitle>
              <DialogDescription>
                Mahsulot ma'lumotlarini kiriting
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nomi *</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Tavsif *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="price">Narxi (so'm) *</Label>
                  <Input
                    id="price"
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category">Kategoriya *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => setFormData({ ...formData, category: value })}
                  >
                    <SelectTrigger id="category">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="elektronika">Elektronika</SelectItem>
                      <SelectItem value="kiyim">Kiyim-kechak</SelectItem>
                      <SelectItem value="oziq-ovqat">Oziq-ovqat</SelectItem>
                      <SelectItem value="uy-jihozlari">Uy jihozlari</SelectItem>
                      <SelectItem value="sport">Sport</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="image">Rasm URL</Label>
                <Input
                  id="image"
                  type="url"
                  placeholder="https://example.com/image.jpg"
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="rating">Reyting</Label>
                  <Input
                    id="rating"
                    type="number"
                    step="0.1"
                    min="0"
                    max="5"
                    value={formData.rating}
                    onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="reviews">Sharhlar soni</Label>
                  <Input
                    id="reviews"
                    type="number"
                    value={formData.reviews}
                    onChange={(e) => setFormData({ ...formData, reviews: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="inStock">Holati</Label>
                  <Select
                    value={formData.inStock.toString()}
                    onValueChange={(value) => setFormData({ ...formData, inStock: value === 'true' })}
                  >
                    <SelectTrigger id="inStock">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="true">Mavjud</SelectItem>
                      <SelectItem value="false">Tugagan</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Bekor qilish
                </Button>
                <Button type="submit" className="btn-primary">
                  {editingProduct ? 'Saqlash' : 'Qo\'shish'}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {products.map(product => (
          <Card key={product.id}>
            <CardContent className="p-6">
              <div className="flex gap-6">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-32 h-32 object-cover rounded-lg"
                />
                
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-xl font-semibold">{product.name}</h3>
                      <p className="text-sm text-muted-foreground capitalize">
                        {product.category}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleEdit(product.id)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handleDelete(product.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {product.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-6">
                      <div>
                        <div className="text-sm text-muted-foreground">Narxi</div>
                        <div className="text-lg font-bold text-primary">
                          {formatPrice(product.price)}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-muted-foreground">Reyting</div>
                        <div className="font-semibold">
                          {product.rating} ⭐ ({product.reviews})
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span className={product.inStock ? 'text-green-600' : 'text-red-600'}>
                        {product.inStock ? 'Mavjud' : 'Tugagan'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
