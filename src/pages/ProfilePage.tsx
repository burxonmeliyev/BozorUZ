import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { User, Phone, Mail, MapPin, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from '@/hooks/use-toast';

export function ProfilePage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated, updateProfile } = useAuthStore();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: user?.address || '',
  });

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  if (!user) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(formData);
    toast({
      title: 'Saqlandi',
      description: 'Profil ma\'lumotlari muvaffaqiyatli yangilandi',
    });
  };

  // Mock orders data
  const mockOrders = [
    {
      id: '1001',
      date: '2024-01-20',
      total: 15000000,
      status: 'delivered' as const,
      items: 2,
    },
    {
      id: '1002',
      date: '2024-01-22',
      total: 4500000,
      status: 'shipped' as const,
      items: 1,
    },
    {
      id: '1003',
      date: '2024-01-25',
      total: 22000000,
      status: 'processing' as const,
      items: 1,
    },
  ];

  const getStatusBadge = (status: string) => {
    const variants = {
      delivered: 'default',
      shipped: 'secondary',
      processing: 'outline',
      pending: 'outline',
    } as const;

    const labels = {
      delivered: 'Yetkazildi',
      shipped: 'Yo\'lda',
      processing: 'Tayyorlanmoqda',
      pending: 'Kutilmoqda',
    };

    return (
      <Badge variant={variants[status as keyof typeof variants]}>
        {labels[status as keyof typeof labels]}
      </Badge>
    );
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m';
  };

  return (
    <div className="container-custom py-8">
      <h1 className="text-4xl font-bold mb-8">Mening Profilim</h1>

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList>
          <TabsTrigger value="profile">Profil</TabsTrigger>
          <TabsTrigger value="orders">Buyurtmalar</TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Shaxsiy Ma'lumotlar</CardTitle>
              <CardDescription>
                Profilingizni tahrirlash va yangilash
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">
                    <User className="inline h-4 w-4 mr-2" />
                    Ism
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">
                    <Mail className="inline h-4 w-4 mr-2" />
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">
                    <Phone className="inline h-4 w-4 mr-2" />
                    Telefon
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+998 90 123 45 67"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="address">
                    <MapPin className="inline h-4 w-4 mr-2" />
                    Manzil
                  </Label>
                  <Input
                    id="address"
                    placeholder="Shahar, ko'cha, uy raqami"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </div>

                <Button type="submit" className="btn-primary">
                  Saqlash
                </Button>
              </form>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="orders">
          <Card>
            <CardHeader>
              <CardTitle>Buyurtmalar Tarixi</CardTitle>
              <CardDescription>
                Barcha buyurtmalaringizni ko'ring
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockOrders.map(order => (
                  <Card key={order.id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4">
                          <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Package className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <div className="font-semibold">
                              Buyurtma #{order.id}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {new Date(order.date).toLocaleDateString('uz-UZ', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                              })}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {order.items} ta mahsulot
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg text-primary mb-2">
                            {formatPrice(order.total)}
                          </div>
                          {getStatusBadge(order.status)}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {mockOrders.length === 0 && (
                  <div className="text-center py-12">
                    <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                    <p className="text-xl font-semibold mb-2">
                      Hali buyurtmalar yo'q
                    </p>
                    <p className="text-muted-foreground mb-6">
                      Birinchi buyurtmangizni bering!
                    </p>
                    <Button asChild className="btn-primary">
                      <a href="/products">Xarid qilishni boshlash</a>
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
