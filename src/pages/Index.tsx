import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [compareList, setCompareList] = useState<number[]>([]);
  const [filters, setFilters] = useState({
    vintage: false,
    clinker: false,
    wholesale: false,
    retail: false,
  });

  const [calculatorOpen, setCalculatorOpen] = useState(false);
  const [quantity, setQuantity] = useState<number>(1000);
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  const [calculationHistory, setCalculationHistory] = useState<Array<{
    id: number;
    productName: string;
    quantity: number;
    unit: string;
    retail: number;
    wholesale: number;
    savings: number;
    savingsPercent: string;
    timestamp: string;
  }>>([]);

  const products = [
    {
      id: 1,
      name: 'Старинный кирпич с клеймом "ТД"',
      category: 'vintage',
      price: 450,
      priceDisplay: '450 ₽/шт',
      wholesalePrice: 380,
      wholesalePriceDisplay: '380 ₽/шт',
      unit: 'шт',
      year: '1890-1910',
      size: '250×120×65 мм',
      weight: '3.5 кг',
      strength: 'M150',
      image: 'https://cdn.poehali.dev/projects/abe35cee-5c73-458f-a1a8-4c29dec695e7/files/c7101e14-f7a3-4702-9131-60d207fb9e27.jpg',
      description: 'Редкий кирпич с клеймом Товарищества донецких заводов',
    },
    {
      id: 2,
      name: 'Клинкерная плитка под старину',
      category: 'clinker',
      price: 3200,
      priceDisplay: '3200 ₽/м²',
      wholesalePrice: 2800,
      wholesalePriceDisplay: '2800 ₽/м²',
      unit: 'м²',
      year: 'Современная',
      size: '240×71×15 мм',
      weight: '1.8 кг/шт',
      strength: 'M200',
      image: 'https://cdn.poehali.dev/projects/abe35cee-5c73-458f-a1a8-4c29dec695e7/files/ceffe6cb-03f9-4f4b-a7a5-2dfe8a5d5e38.jpg',
      description: 'Изготовлена из старинного кирпича методом распила',
    },
    {
      id: 3,
      name: 'Кирпич "Империал" с гербом',
      category: 'vintage',
      price: 650,
      priceDisplay: '650 ₽/шт',
      wholesalePrice: 550,
      wholesalePriceDisplay: '550 ₽/шт',
      unit: 'шт',
      year: '1880-1900',
      size: '255×125×70 мм',
      weight: '4.0 кг',
      strength: 'M175',
      image: 'https://cdn.poehali.dev/projects/abe35cee-5c73-458f-a1a8-4c29dec695e7/files/ba2aabd3-51a9-4a53-a9f0-a3cfdc225b8d.jpg',
      description: 'Кирпич премиального качества с императорским клеймом',
    },
    {
      id: 4,
      name: 'Плитка "Терракота" декоративная',
      category: 'clinker',
      price: 2900,
      priceDisplay: '2900 ₽/м²',
      wholesalePrice: 2500,
      wholesalePriceDisplay: '2500 ₽/м²',
      unit: 'м²',
      year: 'Современная',
      size: '240×60×12 мм',
      weight: '1.5 кг/шт',
      strength: 'M180',
      image: 'https://cdn.poehali.dev/projects/abe35cee-5c73-458f-a1a8-4c29dec695e7/files/c7101e14-f7a3-4702-9131-60d207fb9e27.jpg',
      description: 'Легкая плитка для внутренней отделки',
    },
  ];

  const blogPosts = [
    {
      title: 'История клейм на старинном кирпиче',
      excerpt: 'Каждое клеймо на кирпиче — это уникальная печать истории. Узнайте, как расшифровать эти загадочные знаки...',
      date: '15 ноября 2024',
      image: 'https://cdn.poehali.dev/projects/abe35cee-5c73-458f-a1a8-4c29dec695e7/files/c7101e14-f7a3-4702-9131-60d207fb9e27.jpg',
    },
    {
      title: 'Применение старинного кирпича в современном интерьере',
      excerpt: 'Сочетание винтажного кирпича с современными материалами создаёт неповторимую атмосферу...',
      date: '8 ноября 2024',
      image: 'https://cdn.poehali.dev/projects/abe35cee-5c73-458f-a1a8-4c29dec695e7/files/ceffe6cb-03f9-4f4b-a7a5-2dfe8a5d5e38.jpg',
    },
  ];

  const galleryItems = [
    {
      title: 'Ресторан "Купеческий дворик"',
      description: 'Реставрация исторического здания с использованием оригинального кирпича 1890-х годов',
      image: 'https://cdn.poehali.dev/projects/abe35cee-5c73-458f-a1a8-4c29dec695e7/files/ba2aabd3-51a9-4a53-a9f0-a3cfdc225b8d.jpg',
    },
    {
      title: 'Лофт "Красная стена"',
      description: 'Облицовка интерьера клинкерной плиткой из старинного кирпича',
      image: 'https://cdn.poehali.dev/projects/abe35cee-5c73-458f-a1a8-4c29dec695e7/files/c7101e14-f7a3-4702-9131-60d207fb9e27.jpg',
    },
    {
      title: 'Коттедж "Наследие"',
      description: 'Фасад частного дома, полностью выполненный из старинного кирпича с клеймами',
      image: 'https://cdn.poehali.dev/projects/abe35cee-5c73-458f-a1a8-4c29dec695e7/files/ceffe6cb-03f9-4f4b-a7a5-2dfe8a5d5e38.jpg',
    },
  ];

  const toggleCompare = (id: number) => {
    setCompareList(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const filteredProducts = products.filter(product => {
    if (!filters.vintage && !filters.clinker && !filters.wholesale && !filters.retail) return true;
    return (
      (filters.vintage && product.category === 'vintage') ||
      (filters.clinker && product.category === 'clinker')
    );
  });

  const compareProducts = products.filter(p => compareList.includes(p.id));

  const calculateTotal = () => {
    if (!selectedProduct) return { retail: 0, wholesale: 0, savings: 0 };
    const product = products.find(p => p.id === selectedProduct);
    if (!product) return { retail: 0, wholesale: 0, savings: 0 };

    const retailTotal = product.price * quantity;
    const wholesaleTotal = product.wholesalePrice * quantity;
    const savings = retailTotal - wholesaleTotal;
    const savingsPercent = ((savings / retailTotal) * 100).toFixed(1);

    return { retail: retailTotal, wholesale: wholesaleTotal, savings, savingsPercent };
  };

  const openCalculator = (productId: number) => {
    setSelectedProduct(productId);
    setCalculatorOpen(true);
  };

  const saveCalculation = () => {
    if (!selectedProduct) return;
    const product = products.find(p => p.id === selectedProduct);
    if (!product) return;

    const calc = calculateTotal();
    const newCalculation = {
      id: Date.now(),
      productName: product.name,
      quantity,
      unit: product.unit,
      retail: calc.retail,
      wholesale: calc.wholesale,
      savings: calc.savings,
      savingsPercent: calc.savingsPercent,
      timestamp: new Date().toLocaleString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
    };

    setCalculationHistory([newCalculation, ...calculationHistory]);
  };

  const deleteCalculation = (id: number) => {
    setCalculationHistory(calculationHistory.filter(calc => calc.id !== id));
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="sticky top-0 z-50 border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold text-primary">Империал Brick</h1>
            <div className="hidden md:flex gap-6 items-center">
              {['home', 'catalog', 'gallery', 'blog', 'delivery', 'contacts'].map(section => (
                <button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    activeSection === section ? 'text-primary' : 'text-muted-foreground'
                  }`}
                >
                  {section === 'home' && 'Главная'}
                  {section === 'catalog' && 'Каталог'}
                  {section === 'gallery' && 'Галерея'}
                  {section === 'blog' && 'Блог'}
                  {section === 'delivery' && 'Доставка'}
                  {section === 'contacts' && 'Контакты'}
                </button>
              ))}
              <Button
                size="sm"
                onClick={() => {
                  setSelectedProduct(products[0].id);
                  setCalculatorOpen(true);
                }}
                className="bg-accent hover:bg-accent/90 text-accent-foreground"
              >
                <Icon name="Calculator" size={16} className="mr-2" />
                Калькулятор
              </Button>
            </div>
            <Button variant="outline" size="sm" className="md:hidden">
              <Icon name="Menu" size={20} />
            </Button>
          </div>
        </div>
      </nav>

      {activeSection === 'home' && (
        <>
          <section className="relative h-[600px] flex items-center justify-center overflow-hidden">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://cdn.poehali.dev/projects/abe35cee-5c73-458f-a1a8-4c29dec695e7/files/ba2aabd3-51a9-4a53-a9f0-a3cfdc225b8d.jpg')`,
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40" />
            </div>
            <div className="relative z-10 container mx-auto px-4 text-center text-white">
              <h2 className="text-6xl md:text-7xl font-bold mb-6 animate-fade-in">
                Старинный кирпич с клеймом
              </h2>
              <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto opacity-90">
                Историческая ценность и премиальное качество для ваших проектов
              </p>
              <div className="flex gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground"
                  onClick={() => setActiveSection('catalog')}
                >
                  <Icon name="ShoppingBag" size={20} className="mr-2" />
                  Каталог
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 backdrop-blur border-white/30 text-white hover:bg-white/20"
                  onClick={() => setActiveSection('contacts')}
                >
                  <Icon name="Phone" size={20} className="mr-2" />
                  Связаться
                </Button>
              </div>
            </div>
          </section>

          <section className="py-20 bg-card">
            <div className="container mx-auto px-4">
              <h3 className="text-4xl font-bold text-center mb-12">Наши преимущества</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <Card className="hover-scale">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon name="Award" size={24} className="text-primary" />
                    </div>
                    <CardTitle>Историческая подлинность</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Каждый кирпич — это часть истории с подлинным клеймом 1880-1910 годов
                    </p>
                  </CardContent>
                </Card>
                <Card className="hover-scale">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon name="Truck" size={24} className="text-primary" />
                    </div>
                    <CardTitle>Опт и розница</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Гибкая система цен для оптовых и розничных покупателей
                    </p>
                  </CardContent>
                </Card>
                <Card className="hover-scale">
                  <CardHeader>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon name="Shield" size={24} className="text-primary" />
                    </div>
                    <CardTitle>Премиальное качество</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">
                      Строгий отбор материалов, проверка прочности и сохранности
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </section>
        </>
      )}

      {activeSection === 'catalog' && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-5xl font-bold mb-12 text-center">Каталог</h2>

            <div className="mb-8 p-6 bg-card rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Фильтры</h3>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="vintage"
                    checked={filters.vintage}
                    onCheckedChange={(checked) =>
                      setFilters({ ...filters, vintage: checked as boolean })
                    }
                  />
                  <label htmlFor="vintage" className="text-sm font-medium cursor-pointer">
                    Старинный кирпич
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="clinker"
                    checked={filters.clinker}
                    onCheckedChange={(checked) =>
                      setFilters({ ...filters, clinker: checked as boolean })
                    }
                  />
                  <label htmlFor="clinker" className="text-sm font-medium cursor-pointer">
                    Клинкерная плитка
                  </label>
                </div>
              </div>
            </div>

            <Tabs defaultValue="grid" className="mb-8">
              <TabsList>
                <TabsTrigger value="grid">
                  <Icon name="Grid3x3" size={16} className="mr-2" />
                  Карточки
                </TabsTrigger>
                <TabsTrigger value="compare" disabled={compareList.length === 0}>
                  <Icon name="GitCompare" size={16} className="mr-2" />
                  Сравнение ({compareList.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="grid" className="mt-8">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <Card key={product.id} className="overflow-hidden hover-scale">
                      <div className="relative h-64">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                        <Badge className="absolute top-4 right-4 bg-primary">
                          {product.category === 'vintage' ? 'Старинный' : 'Клинкер'}
                        </Badge>
                      </div>
                      <CardHeader>
                        <CardTitle className="text-xl">{product.name}</CardTitle>
                        <CardDescription>{product.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 mb-4 text-sm">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Период:</span>
                            <span className="font-medium">{product.year}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Размер:</span>
                            <span className="font-medium">{product.size}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">Прочность:</span>
                            <span className="font-medium">{product.strength}</span>
                          </div>
                        </div>
                        <div className="mb-4">
                          <div className="flex items-baseline gap-2">
                            <span className="text-2xl font-bold text-primary">{product.priceDisplay}</span>
                            <span className="text-sm text-muted-foreground">розница</span>
                          </div>
                          <div className="flex items-baseline gap-2">
                            <span className="text-xl font-semibold text-accent">
                              {product.wholesalePriceDisplay}
                            </span>
                            <span className="text-sm text-muted-foreground">опт (от 1000 {product.unit})</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button className="flex-1" size="sm" onClick={() => openCalculator(product.id)}>
                            <Icon name="Calculator" size={16} className="mr-2" />
                            Рассчитать
                          </Button>
                          <Button
                            variant={compareList.includes(product.id) ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => toggleCompare(product.id)}
                          >
                            <Icon name="GitCompare" size={16} />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="compare" className="mt-8">
                {compareProducts.length > 0 && (
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="p-4 text-left font-semibold">Характеристика</th>
                          {compareProducts.map(product => (
                            <th key={product.id} className="p-4 text-left font-semibold">
                              <div className="flex items-center justify-between mb-2">
                                {product.name}
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => toggleCompare(product.id)}
                                >
                                  <Icon name="X" size={16} />
                                </Button>
                              </div>
                              <img
                                src={product.image}
                                alt={product.name}
                                className="w-full h-32 object-cover rounded"
                              />
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b hover:bg-muted/50">
                          <td className="p-4 font-medium">Период</td>
                          {compareProducts.map(product => (
                            <td key={product.id} className="p-4">
                              {product.year}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b hover:bg-muted/50">
                          <td className="p-4 font-medium">Размер</td>
                          {compareProducts.map(product => (
                            <td key={product.id} className="p-4">
                              {product.size}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b hover:bg-muted/50">
                          <td className="p-4 font-medium">Вес</td>
                          {compareProducts.map(product => (
                            <td key={product.id} className="p-4">
                              {product.weight}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b hover:bg-muted/50">
                          <td className="p-4 font-medium">Прочность</td>
                          {compareProducts.map(product => (
                            <td key={product.id} className="p-4">
                              {product.strength}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b hover:bg-muted/50">
                          <td className="p-4 font-medium">Цена (розница)</td>
                          {compareProducts.map(product => (
                            <td key={product.id} className="p-4 text-primary font-semibold">
                              {product.priceDisplay}
                            </td>
                          ))}
                        </tr>
                        <tr className="border-b hover:bg-muted/50">
                          <td className="p-4 font-medium">Цена (опт)</td>
                          {compareProducts.map(product => (
                            <td key={product.id} className="p-4 text-accent font-semibold">
                              {product.wholesalePriceDisplay}
                            </td>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </section>
      )}

      {activeSection === 'gallery' && (
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-5xl font-bold mb-12 text-center">Галерея проектов</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleryItems.map((item, index) => (
                <Card key={index} className="overflow-hidden hover-scale group">
                  <div className="relative h-80 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                      <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                      <p className="text-sm opacity-90">{item.description}</p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'blog' && (
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-5xl font-bold mb-12 text-center">Блог</h2>
            <div className="space-y-8">
              {blogPosts.map((post, index) => (
                <Card key={index} className="overflow-hidden hover-scale">
                  <div className="md:flex">
                    <div className="md:w-1/3">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="w-full h-64 md:h-full object-cover"
                      />
                    </div>
                    <div className="md:w-2/3">
                      <CardHeader>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <Icon name="Calendar" size={16} />
                          {post.date}
                        </div>
                        <CardTitle className="text-2xl">{post.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground mb-4">{post.excerpt}</p>
                        <Button variant="outline">
                          Читать далее
                          <Icon name="ArrowRight" size={16} className="ml-2" />
                        </Button>
                      </CardContent>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {activeSection === 'delivery' && (
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-5xl font-bold mb-12 text-center">Доставка и оплата</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="Truck" size={24} className="text-primary" />
                  </div>
                  <CardTitle>Доставка</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">По Москве и МО</h4>
                    <p className="text-sm text-muted-foreground">
                      Доставка в течение 1-3 дней. Стоимость от 2000 ₽
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">По России</h4>
                    <p className="text-sm text-muted-foreground">
                      Транспортными компаниями. Расчёт при оформлении заказа
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Самовывоз</h4>
                    <p className="text-sm text-muted-foreground">
                      Бесплатно со склада в Подмосковье
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon name="CreditCard" size={24} className="text-primary" />
                  </div>
                  <CardTitle>Оплата</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Для физических лиц</h4>
                    <p className="text-sm text-muted-foreground">
                      Наличный и безналичный расчёт, оплата картой
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Для юридических лиц</h4>
                    <p className="text-sm text-muted-foreground">
                      Безналичный расчёт по счёту с НДС
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Постоплата</h4>
                    <p className="text-sm text-muted-foreground">
                      Возможна для постоянных клиентов
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      )}

      {activeSection === 'contacts' && (
        <section className="py-20">
          <div className="container mx-auto px-4 max-w-4xl">
            <h2 className="text-5xl font-bold mb-12 text-center">Контакты</h2>
            <Card>
              <CardContent className="p-8">
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="MapPin" size={20} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Адрес</h4>
                        <p className="text-sm text-muted-foreground">
                          Московская область, г. Красногорск, промзона «Старый кирпич»
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="Phone" size={20} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Телефон</h4>
                        <p className="text-sm text-muted-foreground">+7 (495) 123-45-67</p>
                        <p className="text-sm text-muted-foreground">+7 (925) 987-65-43</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="Mail" size={20} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Email</h4>
                        <p className="text-sm text-muted-foreground">info@imperial-brick.ru</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Icon name="Clock" size={20} className="text-primary" />
                      </div>
                      <div>
                        <h4 className="font-semibold mb-1">Режим работы</h4>
                        <p className="text-sm text-muted-foreground">Пн-Пт: 9:00 - 18:00</p>
                        <p className="text-sm text-muted-foreground">Сб: 10:00 - 16:00</p>
                        <p className="text-sm text-muted-foreground">Вс: выходной</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-xl font-semibold">Оставьте заявку</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Имя</label>
                        <input
                          type="text"
                          placeholder="Ваше имя"
                          className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Телефон</label>
                        <input
                          type="tel"
                          placeholder="+7 (___) ___-__-__"
                          className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Сообщение</label>
                        <textarea
                          placeholder="Опишите ваш проект"
                          rows={4}
                          className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                        />
                      </div>
                      <Button className="w-full">
                        <Icon name="Send" size={16} className="mr-2" />
                        Отправить заявку
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      <Dialog open={calculatorOpen} onOpenChange={setCalculatorOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="text-2xl">Калькулятор стоимости</DialogTitle>
            <DialogDescription>
              Рассчитайте выгоду при оптовой покупке
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="product">Выберите товар</Label>
              <select
                id="product"
                className="w-full px-4 py-2 border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                value={selectedProduct || ''}
                onChange={(e) => setSelectedProduct(Number(e.target.value))}
              >
                {products.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="quantity">Количество ({products.find(p => p.id === selectedProduct)?.unit || 'шт'})</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="text-lg"
              />
            </div>
            <div className="border-t pt-4 space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Розничная цена:</span>
                <span className="text-xl font-semibold">
                  {calculateTotal().retail.toLocaleString('ru-RU')} ₽
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Оптовая цена:</span>
                <span className="text-2xl font-bold text-accent">
                  {calculateTotal().wholesale.toLocaleString('ru-RU')} ₽
                </span>
              </div>
              <div className="bg-primary/10 p-4 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-primary">Ваша экономия:</span>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-primary">
                      {calculateTotal().savings.toLocaleString('ru-RU')} ₽
                    </div>
                    <div className="text-sm text-muted-foreground">
                      ({calculateTotal().savingsPercent}%)
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                className="flex-1"
                size="lg"
                onClick={saveCalculation}
              >
                <Icon name="Save" size={18} className="mr-2" />
                Сохранить
              </Button>
              <Button className="flex-1" size="lg" onClick={() => {
                setCalculatorOpen(false);
                setActiveSection('contacts');
              }}>
                <Icon name="Phone" size={18} className="mr-2" />
                Заказ
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {activeSection === 'home' && calculationHistory.length > 0 && (
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-bold">Сохранённые расчёты</h3>
              <Badge variant="secondary" className="text-sm">
                {calculationHistory.length} {calculationHistory.length === 1 ? 'расчёт' : 'расчёта'}
              </Badge>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              {calculationHistory.slice(0, 4).map((calc) => (
                <Card key={calc.id} className="hover-scale">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="text-lg mb-1">{calc.productName}</CardTitle>
                        <CardDescription className="text-xs">{calc.timestamp}</CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteCalculation(calc.id)}
                        className="h-8 w-8 p-0"
                      >
                        <Icon name="Trash2" size={14} className="text-muted-foreground" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Количество:</span>
                        <span className="font-medium">{calc.quantity.toLocaleString('ru-RU')} {calc.unit}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Розница:</span>
                        <span className="font-medium">{calc.retail.toLocaleString('ru-RU')} ₽</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Опт:</span>
                        <span className="font-semibold text-accent">{calc.wholesale.toLocaleString('ru-RU')} ₽</span>
                      </div>
                      <div className="border-t pt-2 flex justify-between items-center">
                        <span className="font-semibold text-primary">Экономия:</span>
                        <div className="text-right">
                          <div className="font-bold text-primary">{calc.savings.toLocaleString('ru-RU')} ₽</div>
                          <div className="text-xs text-muted-foreground">({calc.savingsPercent}%)</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {calculationHistory.length > 4 && (
              <div className="text-center mt-6">
                <Button variant="outline" onClick={() => setActiveSection('catalog')}>
                  Посмотреть все расчёты ({calculationHistory.length})
                </Button>
              </div>
            )}
          </div>
        </section>
      )}

      {activeSection === 'catalog' && calculationHistory.length > 0 && (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <Card className="mb-8">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-2xl">История расчётов</CardTitle>
                    <CardDescription>Все сохранённые варианты расчёта стоимости</CardDescription>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCalculationHistory([])}
                    disabled={calculationHistory.length === 0}
                  >
                    <Icon name="Trash2" size={16} className="mr-2" />
                    Очистить всё
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {calculationHistory.map((calc) => (
                    <div
                      key={calc.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="font-semibold mb-1">{calc.productName}</div>
                        <div className="text-sm text-muted-foreground">
                          {calc.quantity.toLocaleString('ru-RU')} {calc.unit} • {calc.timestamp}
                        </div>
                      </div>
                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Опт</div>
                          <div className="text-lg font-bold text-accent">
                            {calc.wholesale.toLocaleString('ru-RU')} ₽
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-muted-foreground">Экономия</div>
                          <div className="text-lg font-bold text-primary">
                            {calc.savings.toLocaleString('ru-RU')} ₽
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => deleteCalculation(calc.id)}
                        >
                          <Icon name="X" size={18} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-2xl font-bold text-primary mb-4">Империал Brick</h3>
              <p className="text-sm text-muted-foreground">
                Оптовая и розничная продажа старинного кирпича с клеймом и клинкерной плитки
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Навигация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <button onClick={() => setActiveSection('catalog')} className="hover:text-primary">
                    Каталог
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveSection('gallery')} className="hover:text-primary">
                    Галерея
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveSection('blog')} className="hover:text-primary">
                    Блог
                  </button>
                </li>
                <li>
                  <button onClick={() => setActiveSection('delivery')} className="hover:text-primary">
                    Доставка
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Контакты</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>+7 (495) 123-45-67</li>
                <li>info@imperial-brick.ru</li>
                <li>Московская область</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 Империал Brick. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;