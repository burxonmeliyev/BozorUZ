import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from '@/hooks/use-toast';

export function LoginPage() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { login, register } = useAuthStore();
  
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await login(loginData.email, loginData.password);
    
    setIsLoading(false);

    if (success) {
      toast({
        title: 'Xush kelibsiz!',
        description: 'Tizimga muvaffaqiyatli kirdingiz',
      });
      navigate('/');
    } else {
      toast({
        title: 'Xatolik',
        description: 'Email yoki parol noto\'g\'ri',
        variant: 'destructive',
      });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const success = await register(registerData.name, registerData.email, registerData.password);
    
    setIsLoading(false);

    if (success) {
      toast({
        title: 'Tabriklaymiz!',
        description: 'Ro\'yxatdan o\'tish muvaffaqiyatli yakunlandi',
      });
      navigate('/');
    } else {
      toast({
        title: 'Xatolik',
        description: 'Ro\'yxatdan o\'tishda xatolik yuz berdi',
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="container-custom py-16">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="gradient-primary h-12 w-12 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-white">B</span>
            </div>
            <span className="text-2xl font-bold">BozorUZ</span>
          </Link>
        </div>

        <Tabs defaultValue="login" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="login">Kirish</TabsTrigger>
            <TabsTrigger value="register">Ro'yxatdan o'tish</TabsTrigger>
          </TabsList>

          <TabsContent value="login">
            <Card>
              <CardHeader>
                <CardTitle>Tizimga kirish</CardTitle>
                <CardDescription>
                  Email va parolingizni kiriting
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="example@email.com"
                      value={loginData.email}
                      onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="login-password">Parol</Label>
                    <Input
                      id="login-password"
                      type="password"
                      value={loginData.password}
                      onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full btn-primary" disabled={isLoading}>
                    {isLoading ? 'Kuting...' : 'Kirish'}
                  </Button>

                  <div className="text-sm text-muted-foreground text-center mt-4">
                    <p>Demo foydalanuvchi:</p>
                    <p>Email: admin@bozoruz.com (Admin)</p>
                    <p>Email: user@example.com (Foydalanuvchi)</p>
                    <p className="mt-2">Istalgan parol bilan kirish mumkin</p>
                  </div>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="register">
            <Card>
              <CardHeader>
                <CardTitle>Ro'yxatdan o'tish</CardTitle>
                <CardDescription>
                  Yangi akkaunt yarating
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="register-name">Ism</Label>
                    <Input
                      id="register-name"
                      type="text"
                      placeholder="Ism Familiya"
                      value={registerData.name}
                      onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-email">Email</Label>
                    <Input
                      id="register-email"
                      type="email"
                      placeholder="example@email.com"
                      value={registerData.email}
                      onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="register-password">Parol</Label>
                    <Input
                      id="register-password"
                      type="password"
                      value={registerData.password}
                      onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full btn-primary" disabled={isLoading}>
                    {isLoading ? 'Kuting...' : 'Ro\'yxatdan o\'tish'}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
