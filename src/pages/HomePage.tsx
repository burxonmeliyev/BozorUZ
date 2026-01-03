import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Shield, Truck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/features/ProductCard';
import { PRODUCTS } from '@/constants/products';

export function HomePage() {
  const featuredProducts = PRODUCTS.filter(p => p.featured);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-primary py-20 animate-fade-in">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-6">
              BozorUZ ga Xush Kelibsiz
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Eng yaxshi mahsulotlar, arzon narxlar va tez yetkazib berish. 
              O'zbekistonning eng ishonchli onlayn bozorida xarid qiling.
            </p>
            <Button size="lg" variant="secondary" asChild className="btn-secondary">
              <Link to="/products">
                Xarid qilishni boshlash
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-muted/50">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-start space-x-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Truck className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Tez Yetkazib Berish</h3>
                <p className="text-sm text-muted-foreground">
                  24 soat ichida sizning uyingizga yetkazib beramiz
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Xavfsiz To'lov</h3>
                <p className="text-sm text-muted-foreground">
                  100% xavfsiz va ishonchli to'lov tizimlari
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold mb-2">Sifatli Mahsulotlar</h3>
                <p className="text-sm text-muted-foreground">
                  Faqat yuqori sifatli va tekshirilgan mahsulotlar
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Tanlangan Mahsulotlar</h2>
              <p className="text-muted-foreground">
                Eng mashhur va eng ko'p sotilayotgan mahsulotlar
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/products">
                Barchasini ko'rish
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-accent">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">
            Maxsus Chegirmalar va Takliflar
          </h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Ro'yxatdan o'ting va birinchi xaridingizda 20% chegirma oling. 
            Yangi mahsulotlar va maxsus takliflar haqida birinchi bo'lib xabardor bo'ling!
          </p>
          <Button size="lg" className="btn-primary" asChild>
            <Link to="/login">Ro'yxatdan o'tish</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
