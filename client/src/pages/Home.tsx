import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Home as HomeIcon, Users, Shield, TrendingUp, Search, MapPin, Calendar, MessageCircle, Package, User } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import CityFilter from "@/components/CityFilter";

export default function Home() {
  const [selectedCity, setSelectedCity] = useState<string>("");
  const [searchType, setSearchType] = useState<string>("");
  const [searchTime, setSearchTime] = useState<string>("");
  const [, setLocation] = useLocation();
  const [displayCount, setDisplayCount] = useState(0);
  const targetCount = 135179;
  
  const { data: recentListings } = trpc.listings.search.useQuery({ limit: 6 });
  const { data: recentRequests } = trpc.rentalRequests.list.useQuery({ limit: 4, offset: 0 });

  // 数字递增动画效果
  useEffect(() => {
    const duration = 2000; // 2秒完成动画
    const steps = 60; // 60帧
    const increment = targetCount / steps;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      if (currentStep <= steps) {
        // 使用easeOutQuad缓动函数，让动画更自然
        const progress = currentStep / steps;
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        setDisplayCount(Math.floor(targetCount * easeProgress));
      } else {
        setDisplayCount(targetCount);
        clearInterval(timer);
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, []);

  // 城市选择处理
  const handleCitySelect = (city: string) => {
    setSelectedCity(city);
  };

  // 搜索功能
  const handleSearch = () => {
    if (searchType === "listing") {
      // 跳转到房源页面，带上城市参数
      const params = new URLSearchParams();
      if (selectedCity) params.set("city", selectedCity);
      if (searchTime) params.set("time", searchTime);
      setLocation(`/listings?${params.toString()}`);
    } else if (searchType === "request") {
      // 跳转到求租页面
      const params = new URLSearchParams();
      if (selectedCity) params.set("city", selectedCity);
      setLocation(`/rental-requests?${params.toString()}`);
    } else {
      // 默认跳转到房源页面
      const params = new URLSearchParams();
      if (selectedCity) params.set("city", selectedCity);
      setLocation(`/listings?${params.toString()}`);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section with Background */}
      <div className="relative h-[600px] flex items-center justify-center" style={{ overflow: 'visible' }}>
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(/hero-bg.jpg)',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/40 to-black/60"></div>
        </div>

        {/* Hero Content */}
        <div className="relative container text-center text-white" style={{ zIndex: 1 }}>
          <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
            全球转租求租平台
          </h1>
          <p className="text-2xl md:text-3xl mb-8 drop-shadow-md">
            小麒麟全球转租通已帮助 <span className="text-orange-400 font-bold">{displayCount.toLocaleString()}</span> 名留学生
          </p>

          {/* Search Box with Glassmorphism */}
          <div className="max-w-4xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-6" style={{ overflow: 'visible', position: 'relative', zIndex: 10 }}>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <CityFilter 
                  onCitySelect={handleCitySelect}
                  selectedCity={selectedCity}
                  fullWidth={true}
                  onCountrySelect={(country) => {
                    const params = new URLSearchParams();
                    params.set("country", country);
                    setLocation(`/listings?${params.toString()}`);
                  }}
                />
              </div>
              <Select value={searchType} onValueChange={setSearchType}>
                <SelectTrigger className="h-14 md:w-48 border-none bg-white/80 text-gray-900">
                  <SelectValue placeholder="寻找" className="text-gray-900" />
                </SelectTrigger>
                <SelectContent className="bg-white text-gray-900">
                  <SelectItem value="listing" className="text-gray-900 hover:bg-gray-100">转租房源</SelectItem>
                  <SelectItem value="request" className="text-gray-900 hover:bg-gray-100">求租</SelectItem>
                </SelectContent>
              </Select>
              <Select value={searchTime} onValueChange={setSearchTime}>
                <SelectTrigger className="h-14 md:w-48 border-none bg-white/80 text-gray-900">
                  <SelectValue placeholder="时间" className="text-gray-900" />
                </SelectTrigger>
                <SelectContent className="bg-white text-gray-900">
                  <SelectItem value="anytime" className="text-gray-900 hover:bg-gray-100">任何时间</SelectItem>
                  <SelectItem value="soon" className="text-gray-900 hover:bg-gray-100">近期</SelectItem>
                  <SelectItem value="later" className="text-gray-900 hover:bg-gray-100">稍后</SelectItem>
                </SelectContent>
              </Select>
              <Button 
                onClick={handleSearch}
                className="h-14 px-8 bg-orange-500 hover:bg-orange-600 text-white text-lg font-semibold"
              >
                <Search className="mr-2 h-5 w-5" />
                搜索
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Feature Cards Section */}
      <div className="container py-16" style={{ position: 'relative', zIndex: 0 }}>
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* 发布转租卡片 - 第一个 */}
          <Card className="group hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <div className="relative h-64 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-orange-400 to-red-500 group-hover:scale-110 transition-transform duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <HomeIcon className="h-24 w-24 text-white/90" />
              </div>
            </div>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-3">发布转租</h3>
              <p className="text-gray-600 mb-4">
                假期回家，对房源不满意但无法退款？尝试转租服务将它转给有缘人
              </p>
              <Link href="/publish/listing">
                <Button className="w-full bg-orange-500 hover:bg-orange-600">
                  立即发布房源
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* 转租房源卡片 - 第二个 */}
          <Card className="group hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <div className="relative h-64 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 group-hover:scale-110 transition-transform duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Users className="h-24 w-24 text-white/90" />
              </div>
            </div>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-3">转租房源</h3>
              <p className="text-gray-600 mb-4">
                浏览全球各地的转租房源，找到最适合你的住所
              </p>
              <Link href="/listings">
                <Button className="w-full bg-blue-500 hover:bg-blue-600">
                  查看所有房源
                </Button>
              </Link>
            </CardContent>
          </Card>

          {/* 求租卡片 - 第三个 */}
          <Card className="group hover:shadow-2xl transition-all duration-300 overflow-hidden">
            <div className="relative h-64 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-teal-500 group-hover:scale-110 transition-transform duration-300"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Package className="h-24 w-24 text-white/90" />
              </div>
            </div>
            <CardContent className="p-6">
              <h3 className="text-2xl font-bold mb-3">我要租房</h3>
              <p className="text-gray-600 mb-4">
                何必苦苦寻找合适房源，发布求租信息，让理想的房子自己来找你
              </p>
              <Link href="/rental-requests">
                <Button className="w-full bg-green-500 hover:bg-green-600">
                  查看所有求租
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Trust Indicators */}
        <div className="bg-gradient-to-r from-orange-50 to-yellow-50 rounded-3xl p-12 mb-16">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">为什么选择小麒麟转租通</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <HomeIcon className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">海量房源</h3>
              <p className="text-gray-600">覆盖全球主要留学城市</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">真实用户</h3>
              <p className="text-gray-600">实名认证，安全可靠</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">平台保障</h3>
              <p className="text-gray-600">专业客服全程护航</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
              <h3 className="text-xl font-bold mb-2">高效匹配</h3>
              <p className="text-gray-600">智能推荐，快速成交</p>
            </div>
          </div>
        </div>

        {/* Recent Listings */}
        {recentListings && recentListings.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">最新房源</h2>
              <Link href="/listings">
                <Button variant="outline" className="border-orange-500 text-orange-600 hover:bg-orange-50">
                  查看全部 →
                </Button>
              </Link>
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              {recentListings.slice(0, 6).map((listing: any) => (
                <Card key={listing.id} className="hover:shadow-xl transition-shadow overflow-hidden group">
                  <div className="relative h-48 bg-gray-200 overflow-hidden">
                    {listing.images && listing.images.length > 0 ? (
                      <img 
                        src={listing.images[0]?.imageUrl || listing.images[0]?.url} 
                        alt={listing.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-100 to-yellow-100">
                        <HomeIcon className="h-16 w-16 text-orange-300" />
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        {listing.propertyType}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-bold text-lg mb-2 line-clamp-1">{listing.title}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      {listing.city}, {listing.country}
                    </div>
                    <div className="flex items-center text-sm text-gray-600 mb-3">
                      <Calendar className="h-4 w-4 mr-1" />
                      {new Date(listing.availableFrom).toLocaleDateString()}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-2xl font-bold text-orange-600">
                        {listing.currency === "GBP" ? "£" : listing.currency === "USD" ? "$" : "¥"}
                        {listing.price}
                        <span className="text-sm text-gray-500">/周</span>
                      </span>
                      <Link href={`/listings/${listing.id}`}>
                        <Button size="sm" className="bg-orange-500 hover:bg-orange-600">
                          查看详情
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Recent Rental Requests */}
        {recentRequests && recentRequests.length > 0 && (
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-gray-900">最新求租</h2>
              <Link href="/rental-requests">
                <Button variant="outline" className="border-green-500 text-green-600 hover:bg-green-50">
                  查看全部 →
                </Button>
              </Link>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {recentRequests.slice(0, 4).map((request: any, index: number) => {
                // 根据用户名判断性别，偶数索引为女生，奇数索引为男生
                const gender = index % 2 === 0 ? 'female' : 'male';
                return (
                <Link key={request.id} href={`/rental-requests/${request.id}`}>
                  <Card className="hover:shadow-xl transition-shadow overflow-hidden cursor-pointer">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-full ${gender === 'female' ? 'bg-pink-100' : 'bg-blue-100'} flex items-center justify-center flex-shrink-0`}>
                            <User className={`h-5 w-5 ${gender === 'female' ? 'text-pink-600' : 'text-blue-600'}`} />
                          </div>
                          <div>
                            <h3 className="font-bold text-lg">{request.userName}</h3>
                            <p className="text-sm text-gray-600">{request.city}, {request.country}</p>
                          </div>
                        </div>
                        <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-semibold">
                          {request.propertyType}
                        </span>
                      </div>
                      <h4 className="font-semibold text-md mb-2 line-clamp-1">{request.title}</h4>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-2">{request.description}</p>
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center text-gray-600">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(request.moveInDate).toLocaleDateString()}
                        </div>
                        <span className="text-lg font-bold text-green-600">
                          {request.currency === "GBP" ? "£" : request.currency === "USD" ? "$" : "¥"}
                          {request.budget}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
            </div>
          </div>
        )}

        {/* User Testimonials */}
        <div className="bg-white rounded-3xl p-12 shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">用户真实评价</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6 bg-gradient-to-br from-orange-50 to-yellow-50 border-none">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-orange-200 flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-orange-600" />
                </div>
                <div>
                  <p className="font-semibold text-lg">孔同学</p>
                  <p className="text-sm text-gray-600">伦敦</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                "这个平台为转租和求租的人提供了关系链，我通过这个平台获得了一些便利。平台员工非常有耐心，一直在帮助我寻找符合我要求的求租人，就算我的发布任务结束了，也依旧在尽心尽力的帮助我寻找。"
              </p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-50 to-purple-50 border-none">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-full bg-blue-200 flex items-center justify-center flex-shrink-0">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="font-semibold text-lg">咚同学</p>
                  <p className="text-sm text-gray-600">布里斯托</p>
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">
                "真的好用，自己之前微博还有微信群发了好久都石沉大海，找了小麒麟推广以后就真的有人来问了！而且成功在两周内租出去了！客服态度好，还有有趣的灵魂，总之是一次很开心的体验🤗"
              </p>
            </Card>
          </div>
          
          {/* 查看更多评价按钮 */}
          <div className="text-center mt-8">
            <Button
              asChild
              size="lg"
              className="bg-[#FF6700] hover:bg-[#FF8533] text-white px-8"
            >
              <a href="/reviews">查看全部评价 →</a>
            </Button>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-12 text-center text-white">
          <h2 className="text-4xl font-bold mb-4">开始您的转租之旅</h2>
          <p className="text-xl mb-8 text-white/90">
            七年专业服务，已帮助数千位留学生成功转租
          </p>
          <div className="flex gap-4 justify-center">
            <Link href="/publish">
              <Button size="lg" className="bg-white text-orange-600 hover:bg-gray-100 text-lg px-8 py-6">
                立即发布
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/10 text-lg px-8 py-6">
                <MessageCircle className="mr-2 h-5 w-5" />
                联系客服
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
