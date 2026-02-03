import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Package, MessageCircle } from "lucide-react";
import ContactDialog from "@/components/ContactDialog";

export default function Marketplace() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedCity, setSelectedCity] = useState<string>("all");
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  const { data: items, isLoading } = trpc.marketplace.getAll.useQuery();

  // 筛选逻辑
  const filteredItems = items?.filter((item: any) => {
    const matchesSearch =
      searchQuery === "" ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || item.category === selectedCategory;
    const matchesCity = selectedCity === "all" || item.city === selectedCity;
    return matchesSearch && matchesCategory && matchesCity;
  });

  // 获取所有城市
  const cities = Array.from(new Set(items?.map((item: any) => item.city) || [])).filter((city): city is string => city !== undefined);

  const categories = [
    { value: "furniture", label: "家具" },
    { value: "electronics", label: "电子产品" },
    { value: "books", label: "书籍" },
    { value: "clothing", label: "服装" },
    { value: "sports", label: "运动器材" },
    { value: "kitchen", label: "厨房用品" },
    { value: "other", label: "其他" },
  ];

  const conditions = {
    new: "全新",
    like_new: "几乎全新",
    good: "良好",
    fair: "一般",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-[#FF6700] to-[#FF8533] text-white py-16">
        <div className="container">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
                <Package className="w-10 h-10" />
                二手市场
              </h1>
              <p className="text-lg text-orange-100">
                留学生闲置物品交易平台，让闲置物品找到新主人
              </p>
            </div>
            <Link href="/publish/marketplace">
              <Button className="bg-white text-orange-600 hover:bg-orange-50">
                发布物品
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* 搜索和筛选 */}
      <div className="container py-8">
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid gap-4 md:grid-cols-4">
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="搜索物品..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="选择分类" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有分类</SelectItem>
                  {categories.map((cat) => (
                    <SelectItem key={cat.value} value={cat.value}>
                      {cat.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder="选择城市" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">所有城市</SelectItem>
                  {cities.map((city: string) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* 发布按钮 */}
        <div className="mb-8 flex justify-end">
          <Link href="/publish/marketplace">
            <Button className="bg-[#FF6700] hover:bg-[#FF8533]">
              <Package className="w-4 h-4 mr-2" />
              发布闲置物品
            </Button>
          </Link>
        </div>

        {/* 物品列表 */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6700]"></div>
            <p className="mt-4 text-gray-600">加载中...</p>
          </div>
        ) : filteredItems && filteredItems.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item: any) => (
              <Card key={item.id} className="hover:shadow-lg transition-shadow">
                {item.images && item.images.length > 0 && (
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg line-clamp-2">
                      {item.title}
                    </h3>
                    <Badge variant="outline" className="ml-2 shrink-0">
                      {categories.find((c) => c.value === item.category)?.label ||
                        item.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="secondary">
                      {conditions[item.condition as keyof typeof conditions]}
                    </Badge>
                    <span className="text-sm text-gray-500">{item.city}</span>
                  </div>
                  <p className="text-2xl font-bold text-[#FF6700] mb-3">
                    ${item.price}
                  </p>
                  {item.description && (
                    <p className="text-sm text-gray-600 line-clamp-2 mb-3">
                      {item.description}
                    </p>
                  )}
                  <div className="text-xs text-gray-400">
                    发布于 {new Date(item.createdAt).toLocaleDateString("zh-CN")}
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href="/contact-service" className="w-full">
                    <Button className="w-full bg-[#FF6700] hover:bg-[#FF8533]">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      联系客服咨询
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="py-12">
            <CardContent className="text-center">
              <Package className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">暂无符合条件的物品</p>
            </CardContent>
          </Card>
        )}
      </div>

      <ContactDialog 
        open={contactDialogOpen} 
        onOpenChange={setContactDialogOpen}
        title="发布二手物品"
        description="添加微信客服，告诉我们您想出售的物品信息，我们将帮助您快速找到买家"
      />
    </div>
  );
}
