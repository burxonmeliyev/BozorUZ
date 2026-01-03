import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ShoppingCart, Star, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PRODUCTS, REVIEWS } from '@/constants/products';
import { useCartStore } from '@/stores/cartStore';
import { useToast } from '@/hooks/use-toast';

export function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const addItem = useCartStore(state => state.addItem);
  const [selectedImage, setSelectedImage] = useState(0);

  const product = PRODUCTS.find(p => p.id === id);
  const productReviews = REVIEWS.filter(r => r.productId === id);

  if (!product) {
    return (
      <div className="container-custom py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Mahsulot topilmadi</h1>
        <Button onClick={() => navigate('/products')}>
          Mahsulotlarga qaytish
        </Button>
      </div>
    );
  }

  const images = product.images || [product.image];

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('uz-UZ').format(price) + ' so\'m';
  };

  const handleAddToCart = () => {
    addItem(product);
    toast({
      title: 'Savatchaga qo\'shildi',
      description: `${product.name} savatchaga muvaffaqiyatli qo'shildi`,
    });
  };

  return (
    <div className="container-custom py-8">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Orqaga
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Images */}
        <div>
          <div className="mb-4 rounded-lg overflow-hidden border">
            <img
              src={images[selectedImage]}
              alt={product.name}
              className="w-full h-[500px] object-cover"
            />
          </div>
          
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === idx ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${idx + 1}`}
                    className="w-full h-24 object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
              <Badge variant="secondary">{product.category}</Badge>
            </div>
            {product.discount && (
              <Badge className="gradient-secondary border-0 text-lg px-3 py-1">
                -{product.discount}%
              </Badge>
            )}
          </div>

          <div className="flex items-center space-x-2 mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(product.rating)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-lg font-medium">{product.rating}</span>
            <span className="text-muted-foreground">
              ({product.reviews} ta sharh)
            </span>
          </div>

          <div className="mb-6">
            <div className="flex items-baseline space-x-3 mb-2">
              <span className="text-4xl font-bold text-primary">
                {formatPrice(product.price)}
              </span>
              {product.originalPrice && (
                <span className="text-xl text-muted-foreground line-through">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
            <Badge variant={product.inStock ? 'default' : 'destructive'}>
              {product.inStock ? 'Mavjud' : 'Tugagan'}
            </Badge>
          </div>

          <Separator className="my-6" />

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-3">Tavsif</h2>
            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>
          </div>

          <div className="flex gap-4">
            <Button
              size="lg"
              className="flex-1 btn-primary"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="mr-2 h-5 w-5" />
              Savatchaga qo'shish
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1"
              disabled={!product.inStock}
            >
              Xoziroq sotib olish
            </Button>
          </div>
        </div>
      </div>

      {/* Reviews */}
      {productReviews.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6">Sharhlar</h2>
          <div className="space-y-4">
            {productReviews.map(review => (
              <Card key={review.id}>
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{review.userName}</h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(review.date).toLocaleDateString('uz-UZ')}
                      </p>
                    </div>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.comment}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
