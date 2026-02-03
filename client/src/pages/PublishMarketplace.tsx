import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import Navbar from "@/components/Navbar";
import { ArrowLeft } from "lucide-react";
import PremiumContactCard from "@/components/PremiumContactCard";

const COUNTRIES = ["英国", "澳洲", "美国", "中国", "加拿大", "新西兰", "新加坡", "日本"];
const CATEGORIES = [
  "家具家电",
  "电子产品",
  "服装配饰",
  "图书教材",
  "运动器材",
  "厨房用品",
  "生活用品",
  "其他"
];
const CONDITIONS = ["全新", "九成新", "八成新", "七成新", "六成新及以下"];

export default function PublishMarketplace() {
  const [, navigate] = useLocation();
  
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    condition: "",
    price: "",
    country: "",
    city: "",
    description: ""
  });

  const [showContact, setShowContact] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 直接显示联系界面，不调用后端API
    setShowContact(true);
    toast.success("表单提交成功！请添加微信客服发送您的物品信息");
  };

  // 如果显示联系界面
  if (showContact) {
    return <PremiumContactCard formData={formData} onBack={() => setShowContact(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Navbar />
      
      <div className="container py-8 max-w-4xl">
        <Button
          variant="ghost"
          className="mb-6"
          onClick={() => navigate("/publish")}
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          返回
        </Button>

        <Card className="p-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">发布闲置物品</h1>
            <p className="text-gray-600">填写物品信息，让更多人看到您的闲置物品</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 物品信息 */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">物品信息</h2>

              {/* 物品标题 */}
              <div>
                <Label htmlFor="title">物品标题*</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  placeholder="例如：九成新iPhone 14 Pro Max 256GB"
                />
              </div>

              {/* 分类和成色 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="category">物品分类*</Label>
                  <Select value={formData.category} onValueChange={(value) => setFormData({...formData, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="请选择分类" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORIES.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="condition">物品成色*</Label>
                  <Select value={formData.condition} onValueChange={(value) => setFormData({...formData, condition: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="请选择成色" />
                    </SelectTrigger>
                    <SelectContent>
                      {CONDITIONS.map(condition => (
                        <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* 价格 */}
              <div>
                <Label htmlFor="price">价格*</Label>
                <div className="flex gap-2">
                  <Select defaultValue="GBP">
                    <SelectTrigger className="w-24">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="GBP">GBP</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="AUD">AUD</SelectItem>
                      <SelectItem value="CNY">CNY</SelectItem>
                    </SelectContent>
                  </Select>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({...formData, price: e.target.value})}
                      placeholder="价格"
                    />
                </div>
              </div>

              {/* 国家和城市 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="country">国家*</Label>
                  <Select value={formData.country} onValueChange={(value) => setFormData({...formData, country: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="请选择国家" />
                    </SelectTrigger>
                    <SelectContent>
                      {COUNTRIES.map(country => (
                        <SelectItem key={country} value={country}>{country}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="city">城市*</Label>
                <Input
                  id="city"
                  value={formData.city}
                  onChange={(e) => setFormData({...formData, city: e.target.value})}
                  placeholder="例如：曼彻斯特市中心"
                />
                </div>
              </div>

              {/* 物品描述 */}
              <div>
                <Label htmlFor="description">物品描述*</Label>
                <Textarea
                  id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="请详细描述物品的情况，包括购买时间、使用情况、有无磕碰等"
                rows={4}
              />
              </div>

              {/* 提示信息 */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-6">
                <h3 className="font-semibold text-orange-600 mb-2">提交后我们将为您：</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• 全网平台推广您的闲置物品</li>
                  <li>• 匹配有需要的买家</li>
                  <li>• 专业顾问协助交易</li>
                  <li>• 24小时内响应您的需求</li>
                </ul>
              </div>
            </div>

            {/* 提交按钮 */}
            <div className="flex justify-center pt-6">
              <Button
                type="button"
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-12"
                onClick={(e) => {
                  const form = e.currentTarget.closest('form');
                  if (form) {
                    const event = new Event('submit', { bubbles: true, cancelable: true });
                    form.dispatchEvent(event);
                  }
                }}
              >
                立即发布
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
