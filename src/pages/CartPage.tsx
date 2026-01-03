import { Link, useNavigate } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CartItem } from '@/components/features/CartItem';
import { useCartStore } from '@/stores/cartStore';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from '@/hooks/use-toast';

export function CartPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { items, getTotalPrice, clearCart } = useCartStore();
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  const total = getTotalPrice();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m';
  };

  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast({
        title: 'Tizimga kirish kerak',
        description: 'Buyurtma berish uchun avval tizimga kiring',
        variant: 'destructive',
      });
      navigate('/login');
      return;
    }

    toast({
      title: 'Buyurtma qabul qilindi!',
      description: 'Buyurtmangiz muvaffaqiyatli qabul qilindi. Tez orada siz bilan bog\'lanamiz.',
    });
    
    clearCart();
    navigate('/profile');
  };

  if (items.length === 0) {
    return (
      <div className="container-custom py-16">
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-16">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">Savatingiz bo'sh</h2>
            <p className="text-muted-foreground mb-6">
              Xarid qilishni boshlash uchun mahsulotlar qo'shing
            </p>
            <Button asChild className="btn-primary">
              <Link to="/products">
                Mahsulotlarni ko'rish
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container-custom py-8">
      <h1 className="text-4xl font-bold mb-8">Savat</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {items.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>

        {/* Summary */}
        <div>
          <Card className="sticky top-20">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold mb-4">Buyurtma ma'lumotlari</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Mahsulotlar soni:</span>
                  <span className="font-medium">{items.length}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Jami miqdor:</span>
                  <span className="font-medium">
                    {items.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Yetkazib berish:</span>
                  <span className="font-medium text-green-600">Bepul</span>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between items-baseline mb-6">
                <span className="text-lg font-semibold">Jami:</span>
                <span className="text-2xl font-bold text-primary">
                  {formatPrice(total)}
                </span>
              </div>

              <Button
                className="w-full btn-primary mb-3"
                size="lg"
                onClick={handleCheckout}
              >
                Buyurtma berish
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              <Button
                variant="outline"
                className="w-full"
                asChild
              >
                <Link to="/products">Xaridni davom ettirish</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
