import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { Search, MapPin, Calendar, Home, Filter, ChevronRight } from "lucide-react";
import CityFilter from "@/components/CityFilter";
import { Badge } from "@/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { countries } from "@/data/regions";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import ContactDialog from "@/components/ContactDialog";

// 国家映射
const countryMap: Record<string, string> = {
  "United Kingdom": "英国",
  "United States": "美国",
  "Canada": "加拿大",
  "Australia": "澳洲",
  "Singapore": "新加坡",
};

export default function Listings() {
  const [location, setLocation] = useLocation();
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [propertyType, setPropertyType] = useState<string>("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  // 从uRL参数读取筛选条件
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const urlCountry = params.get("country");
    const urlCity = params.get("city");
    
    // country和city互斥，只能有一个
    if (urlCity) {
      setCity(urlCity);
      setCountry(""); // 清空country
    } else if (urlCountry) {
      setCountry(urlCountry);
      setCity(""); // 清空city
    } else {
      // 如果都没有，清空两者
      setCountry("");
      setCity("");
    }
  }, [location]);

  const handleCitySelect = (cityNameEn: string) => {
    console.log('City selected:', cityNameEn);
    setCity(cityNameEn);
    setCountry(""); // 清除国家筛选
  };

  const handleCountrySelect = (countryName: string) => {
    console.log('Country selected:', countryName);
    // 如果选择的是"all"，表示全部国家，清空country状态
    setCountry(countryName === "all" ? "" : countryName);
    setCity(""); // 清除城市筛选
  };

  const { data: listings, isLoading } = trpc.listings.search.useQuery({
    city: city || undefined,
    country: country || undefined,
    propertyType: propertyType || undefined,
    minPrice: minPrice ? Number(minPrice) : undefined,
    maxPrice: maxPrice ? Number(maxPrice) : undefined,
    limit: 50,
  });

  // 计算房源数量
  const listingCount = listings?.length || 0;
  const activeListingCount = listings?.filter(l => l.status === 'active').length || 0;

  // 根据城市查找对应的国家
  const getCityCountry = (cityName: string): string | null => {
    for (const countryData of countries) {
      // 检查热门城市
      if (countryData.hotCities?.some(c => c.nameEn === cityName)) {
        return countryData.nameEn;
      }
      // 检查所有城市
      if (countryData.cities?.some(c => c.nameEn === cityName)) {
        return countryData.nameEn;
      }
      // 检查州/省下的城市
      if (countryData.states?.some(state => 
        state.cities.some(c => c.nameEn === cityName)
      )) {
        return countryData.nameEn;
      }
    }
    return null;
  };

  // 生成面包屑导航
  const getBreadcrumbs = () => {
    const crumbs = [{ label: "首页", href: "/" }];
    
    if (country) {
      const countryLabel = countryMap[country] || country;
      crumbs.push({ label: `${countryLabel}租房`, href: `/listings?country=${country}` });
    } else if (city) {
      // 如果只有城市，自动添加国家层级
      const cityCountry = getCityCountry(city);
      if (cityCountry) {
        const countryLabel = countryMap[cityCountry] || cityCountry;
        crumbs.push({ label: `${countryLabel}租房`, href: `/listings?country=${cityCountry}` });
      }
    }
    
    if (city) {
      crumbs.push({ label: `${city}租房`, href: `/listings?city=${city}` });
    }
    
    if (!country && !city) {
      crumbs.push({ label: "全部房源", href: "/listings" });
    }
    
    return crumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-8">
        {/* 面包屑导航 */}
        <Breadcrumb className="mb-4">
          <BreadcrumbList>
            {breadcrumbs.map((crumb, index) => (
              <div key={index} className="flex items-center">
                {index > 0 && <BreadcrumbSeparator><ChevronRight className="h-4 w-4" /></BreadcrumbSeparator>}
                <BreadcrumbItem>
                  {index === breadcrumbs.length - 1 ? (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink asChild>
                      <a href={crumb.href}>{crumb.label}</a>
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">
              {city ? `${city}租房` : country ? `${countryMap[country] || country}租房` : "房源列表"}
            </h1>
            {listingCount > 0 && (
              <p className="text-sm text-muted-foreground mt-2">
                共计 {activeListingCount} 个
                {city ? `${city}` : country ? `${countryMap[country] || country}` : ""}
                租房信息
              </p>
            )}
          </div>
          <Link href="/publish/listing">
            <Button>发布房源</Button>
          </Link>
        </div>

        {/* Filters */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
              <Select value={country || "all"} onValueChange={handleCountrySelect}>
                <SelectTrigger>
                  <SelectValue placeholder="选择国家" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部国家</SelectItem>
                  <SelectItem value="United Kingdom">英国</SelectItem>
                  <SelectItem value="United States">美国</SelectItem>
                  <SelectItem value="Canada">加拿大</SelectItem>
                  <SelectItem value="Australia">澳洲</SelectItem>
                  <SelectItem value="Singapore">新加坡</SelectItem>
                </SelectContent>
              </Select>
              <CityFilter
                onCitySelect={handleCitySelect}
                selectedCity={city}
                onCountrySelect={handleCountrySelect}
              />
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger>
                  <SelectValue placeholder="房型" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value=" ">全部</SelectItem>
                  <SelectItem value="studio">整租套间(Studio)</SelectItem>
                  <SelectItem value="1b1b">1b1b</SelectItem>
                  <SelectItem value="2b2b">2b2b</SelectItem>
                  <SelectItem value="3b3b">3b3b</SelectItem>
                  <SelectItem value="4b4b">4b4b+</SelectItem>
                </SelectContent>
              </Select>
              <Input
                type="number"
                placeholder="最低价格"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
              <Input
                type="number"
                placeholder="最高价格"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Listings Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i}>
                <Skeleton className="aspect-video w-full" />
                <CardContent className="p-4 space-y-2">
                  <Skeleton className="h-6 w-3/4" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : listings && listings.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <Link key={listing.id} href={`/listings/${listing.id}?from=${encodeURIComponent(location)}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group">
                  <div className="aspect-video bg-muted relative overflow-hidden">
                    {listing.images && listing.images.length > 0 ? (
                      <img
                        src={listing.images[0].imageUrl || listing.images[0].url}
                        alt={listing.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Home className="h-12 w-12 text-muted-foreground" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <Badge className="bg-blue-500">
                        {listing.propertyType === "studio" ? "整租套间(Studio)" :
                         listing.propertyType === "1b1b" ? "1b1b" :
                         listing.propertyType === "2b2b" ? "2b2b" :
                         listing.propertyType === "3b3b" ? "3b3b" :
                         listing.propertyType === "4b4b" ? "4b4b+" : "其他"}
                      </Badge>
                      {listing.isVip && (
                        <Badge className="bg-orange-500">VIP置顶</Badge>
                      )}
                      {listing.isStudentCertified && (
                        <Badge className="bg-green-500">学生认证</Badge>
                      )}
                    </div>
                    {listing.status === "rented" && (
                      <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/40 to-black/50 backdrop-blur-[2px] flex items-center justify-center">
                        <div className="relative">
                          <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-amber-600/20 blur-xl"></div>
                          <div className="relative border-2 border-amber-500/80 bg-black/80 backdrop-blur-[4px] rounded-lg px-8 py-4 shadow-2xl">
                            <div className="flex flex-col items-center gap-1">
                              <svg className="w-8 h-8 text-amber-400 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                              </svg>
                              <span className="text-xl font-bold text-white tracking-wider" style={{ textShadow: '0 0 10px rgba(251, 191, 36, 0.5), 0 2px 4px rgba(0,0,0,0.8)' }}>
                                RENTED
                              </span>
                              <span className="text-sm text-amber-200/90 font-medium">
                                已租出
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4 space-y-2">
                    <h3 className="font-semibold line-clamp-1">{listing.title}</h3>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      {format(new Date(listing.availableFrom), "yyyy/MM/dd")}
                      {listing.availableTo && ` - ${format(new Date(listing.availableTo), "yyyy/MM/dd")}`}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" />
                      {listing.city}, {listing.country}
                    </div>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-2xl font-bold text-primary">
                        {listing.currency === "GBP" ? "£" : listing.currency === "USD" ? "$" : "¥"}
                        {listing.price}
                      </span>
                      <Button variant="ghost" size="sm">查看详情</Button>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Home className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">暂无房源</h3>
            <p className="text-muted-foreground mb-4">调整筛选条件或发布新房源</p>
            <Link href="/publish/listing">
              <Button>发布房源</Button>
            </Link>
          </div>
        )}
        
        {/* 隐私保护提示 */}
        {listings && listings.length > 0 && (
          <div className="text-center py-6 text-sm text-muted-foreground">
            已租出超一周房源为保障用户隐私不予展示
          </div>
        )}
      </div>

      <ContactDialog 
        open={contactDialogOpen} 
        onOpenChange={setContactDialogOpen}
        title="发布房源信息"
        description="添加微信客服，我们将协助您快速发布房源信息，并帮助您找到合适的租客"
      />
    </div>
  );
}
