import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

import Navbar from "@/components/Navbar";
import { ArrowLeft } from "lucide-react";
import PremiumContactCard from "@/components/PremiumContactCard";

const COUNTRIES = ["英国", "澳洲", "美国", "中国", "加拿大", "新西兰", "新加坡", "日本"];
const IDENTITIES = ["预科", "本科", "研究生", "已工作"];
const ROOM_TYPES = [
  "整租套间(Studio)",
  "单间-有独立卫浴(Ensuite)",
  "单间-无独立卫浴(Non-ensuite)",
  "1个房间 1个厕所(1b1b)",
  "2个房间 1个厕所(2b1b)",
  "2个房间 2个厕所(2b2b)",
  "3个房间",
  "4个房间及以上"
];

export default function PublishRequest() {
  const [, navigate] = useLocation();

  
  const [formData, setFormData] = useState({
    country: "",
    city: "",
    identity: "",
    university: "",
    roomTypes: [] as string[],
    startDate: "",
    endDate: "",
    budget: "",
    introduction: "",
    description: "",
    wechatId: ""
  });

  const [showContact, setShowContact] = useState(false);

  useEffect(() => {
    console.log('showContact changed:', showContact);
  }, [showContact]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('handleSubmit called, roomTypes:', formData.roomTypes);

    if (formData.roomTypes.length === 0) {
      console.log('No room types selected');
      toast.error("请至少选择一种房型");
      return;
    }

    console.log('Setting showContact to true');
    // 直接显示联系界面，不调用后端API
    setShowContact(true);
    toast.success("表单提交成功！请添加微信客服发送您的求租信息");
  };

  const toggleRoomType = (roomType: string) => {
    if (formData.roomTypes.includes(roomType)) {
      setFormData({
        ...formData,
        roomTypes: formData.roomTypes.filter(t => t !== roomType)
      });
    } else {
      setFormData({
        ...formData,
        roomTypes: [...formData.roomTypes, roomType]
      });
    }
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">求租生成器</h1>
            <p className="text-gray-600">在这里提交求租信息（内容越详细，匹配效果越好）</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 求租详情 */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">求租详情</h2>

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
                    placeholder="请输入城市"
                    required
                  />
                </div>
              </div>

              {/* 身份和大学 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="identity">身份*</Label>
                  <Select value={formData.identity} onValueChange={(value) => setFormData({...formData, identity: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="请选择身份" />
                    </SelectTrigger>
                    <SelectContent>
                      {IDENTITIES.map(identity => (
                        <SelectItem key={identity} value={identity}>{identity}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="university">大学</Label>
                  <Input
                    id="university"
                    value={formData.university}
                    onChange={(e) => setFormData({...formData, university: e.target.value})}
                    placeholder="请输入大学名称"
                  />
                </div>
              </div>

              {/* 房型选择 */}
              <div>
                <Label>房型*（可多选）</Label>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {ROOM_TYPES.map(roomType => (
                    <button
                      key={roomType}
                      type="button"
                      onClick={() => toggleRoomType(roomType)}
                      className={`px-4 py-2 rounded-lg border-2 transition-all ${
                        formData.roomTypes.includes(roomType)
                          ? "border-orange-500 bg-orange-50 text-orange-700"
                          : "border-gray-200 hover:border-gray-300"
                      }`}
                    >
                      {roomType}
                    </button>
                  ))}
                </div>
              </div>

              {/* 求租日期 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">求租起始日*</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="endDate">求租结束日</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  />
                </div>
              </div>

              {/* 预算 */}
              <div>
                <Label htmlFor="budget">每周预算*</Label>
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
                    id="budget"
                    type="number"
                    value={formData.budget}
                    onChange={(e) => setFormData({...formData, budget: e.target.value})}
                    placeholder="请输入预算"
                    required
                  />
                </div>
              </div>

              {/* 个人介绍与需求 */}
              <div>
                <Label htmlFor="introduction">个人介绍与需求*</Label>
                <Textarea
                  id="introduction"
                  value={formData.introduction}
                  onChange={(e) => setFormData({...formData, introduction: e.target.value})}
                  placeholder="请写下你的自我介绍与租房的需求，这样可以方便大家联系你哦！"
                  rows={4}
                />
              </div>

              {/* 详细描述 */}
              <div>
                <Label htmlFor="description">详细描述</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  placeholder="例如：走路八分钟到唐人街，金融城附近，周围是否有中超中餐厅超市"
                  rows={3}
                />
              </div>

              {/* 提示信息 */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-6">
                <h3 className="font-semibold text-orange-600 mb-2">提交后我们将为您：</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• 全网平台推广您的求租需求</li>
                  <li>• AI智能匹配合适房源</li>
                  <li>• 专业顾问一对一服务</li>
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
