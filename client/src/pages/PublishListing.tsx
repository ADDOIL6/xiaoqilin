import { useState } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

import Navbar from "@/components/Navbar";
import { ArrowLeft, Upload, X } from "lucide-react";
import PremiumContactCard from "@/components/PremiumContactCard";
import ListingPosterGenerator from "@/components/ListingPosterGenerator";

const COUNTRIES = ["英国", "澳洲", "美国", "中国", "加拿大", "新西兰", "新加坡", "日本"];
const PROPERTY_TYPES = ["私人公寓", "学生公寓", "学校公寓", "服务式公寓"];
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
const FLOORS = ["G层", "1层", "2层", "3层", "4层", "5层", "6层", "7层", "8层", "9层", "10层", "10+层"];
const FACILITIES = [
  "有电梯", "有空调", "有阳台", "有浴缸", "有早餐", "有免费清洁",
  "有前台", "带停车位", "有健身房", "有独立洗衣机", "有落地窗", "有抽油烟机",
  "有游泳池", "宠物友好"
];
const BOOKING_CHANNELS = ["异乡好居", "Hino", "Hooli", "Awehome集好家", "其他"];

export default function PublishListing() {
  const [, navigate] = useLocation();
  const [uploading, setUploading] = useState(false);
  const [showPoster, setShowPoster] = useState(false);
  const [showContact, setShowContact] = useState(false);
  
  const [formData, setFormData] = useState({
    country: "",
    city: "",
    postcode: "",
    address: "",
    propertyName: "",
    identityType: "转租租客",
    propertyType: "",
    roomType: "",
    roomName: "",
    floor: "",
    roomNumber: "",
    startDate: "",
    endDate: "",
    flexibleRental: [] as string[],
    originalPrice: "",
    currentPrice: "",
    facilities: [] as string[],
    description: "",
    reason: "",
    acceptableGroups: [] as string[],
    bookingChannel: "",
    wechatId: "",
    images: [] as string[],
    agreeTerms: false
  });

  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  const createListing = trpc.listings.create.useMutation({
    onSuccess: () => {
      toast.success("表单提交成功！正在生成长图...");
      // 显示长图生成器
      setShowPoster(true);
    },
    onError: (error) => {
      toast.error(`提交失败：${error.message}`);
    }
  });

  // 纯本地图片预览，不上传到服务器
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    
    for (const file of Array.from(files)) {
      if (file.size > 10 * 1024 * 1024) {
        toast.error(`${file.name} 文件过大，请选择小于10MB的图片`);
        continue;
      }

      const reader = new FileReader();
      reader.onload = (event) => {
        const dataUrl = event.target?.result?.toString();
        if (!dataUrl) return;
        
        // 保存本地预览URL
        setFormData(prev => ({ ...prev, images: [...prev.images, dataUrl] }));
        setImagePreviews(prev => [...prev, dataUrl]);
      };
      reader.readAsDataURL(file);
    }
    
    toast.success(`图片已添加，将在长图中展示`);
    setUploading(false);
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    setImagePreviews(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.agreeTerms) {
      toast.error("请阅读并同意相关协议");
      return;
    }

    // 直接显示联系界面，不生成长图
    setShowContact(true);
    toast.success("表单提交成功！请添加微信客服发送您的房源信息");
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
            <h1 className="text-3xl font-bold text-gray-900 mb-2">房源长图生成器</h1>
            <p className="text-gray-600">在这里提交房源信息（内容细致、传播效果更好）</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* 房源详情 */}
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900 border-b pb-2">房源详情</h2>

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
                  />
                </div>
              </div>

              {/* 邮编和地址 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="postcode">邮编</Label>
                  <Input
                    id="postcode"
                    value={formData.postcode}
                    onChange={(e) => setFormData({...formData, postcode: e.target.value})}
                    placeholder="S60 9ZR"
                  />
                </div>

                <div>
                  <Label htmlFor="address">地址*</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    placeholder="Property name + Street Name"
                  />
                </div>
              </div>

              {/* 公寓名称 */}
              <div>
                <Label htmlFor="propertyName">公寓名称</Label>
                <Input
                  id="propertyName"
                  value={formData.propertyName}
                  onChange={(e) => setFormData({...formData, propertyName: e.target.value})}
                  placeholder="请输入公寓名称"
                />
              </div>

              {/* 身份类型 */}
              <div>
                <Label>你的身份类型？*</Label>
                <div className="flex gap-4 mt-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="identityType"
                      value="转租租客"
                      checked={formData.identityType === "转租租客"}
                      onChange={(e) => setFormData({...formData, identityType: e.target.value})}
                      className="w-4 h-4 text-orange-500"
                    />
                    <span>转租租客</span>
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="identityType"
                      value="直租房东"
                      checked={formData.identityType === "直租房东"}
                      onChange={(e) => setFormData({...formData, identityType: e.target.value})}
                      className="w-4 h-4 text-orange-500"
                    />
                    <span>直租房东</span>
                  </label>
                </div>
              </div>

              {/* 公寓类型和房型 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="propertyType">公寓类型*</Label>
                  <Select value={formData.propertyType} onValueChange={(value) => setFormData({...formData, propertyType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择公寓类型" />
                    </SelectTrigger>
                    <SelectContent>
                      {PROPERTY_TYPES.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="roomType">房型*</Label>
                  <Select value={formData.roomType} onValueChange={(value) => setFormData({...formData, roomType: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择房型" />
                    </SelectTrigger>
                    <SelectContent>
                      {ROOM_TYPES.map(type => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* 房型名称和楼层 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="roomName">房型名称</Label>
                  <Input
                    id="roomName"
                    value={formData.roomName}
                    onChange={(e) => setFormData({...formData, roomName: e.target.value})}
                    placeholder="请输入房型名称"
                  />
                </div>

                <div>
                  <Label htmlFor="floor">楼层</Label>
                  <Select value={formData.floor} onValueChange={(value) => setFormData({...formData, floor: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="选择楼层" />
                    </SelectTrigger>
                    <SelectContent>
                      {FLOORS.map(floor => (
                        <SelectItem key={floor} value={floor}>{floor}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* 房间号 */}
              <div>
                <Label htmlFor="roomNumber">房间号</Label>
                <Input
                  id="roomNumber"
                  value={formData.roomNumber}
                  onChange={(e) => setFormData({...formData, roomNumber: e.target.value})}
                  placeholder="请输入房间号"
                />
              </div>

              {/* 转租日期 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="startDate">转租起始日*</Label>
                  <Input
                    id="startDate"
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="endDate">转租结束日*</Label>
                  <Input
                    id="endDate"
                    type="date"
                    value={formData.endDate}
                    onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                  />
                </div>
              </div>

              {/* 分段出租选项 */}
              <div>
                <Label>是否可以分段出租？</Label>
                <div className="space-y-2 mt-2">
                  {["可以一天起租", "可以一周起租", "可以一个月起租"].map(option => (
                    <div key={option} className="flex items-center gap-2">
                      <Checkbox
                        id={option}
                        checked={formData.flexibleRental.includes(option)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData({...formData, flexibleRental: [...formData.flexibleRental, option]});
                          } else {
                            setFormData({...formData, flexibleRental: formData.flexibleRental.filter(o => o !== option)});
                          }
                        }}
                      />
                      <Label htmlFor={option} className="cursor-pointer">{option}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* 价格 */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="originalPrice">原价 (每周)</Label>
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
                      id="originalPrice"
                      type="number"
                      value={formData.originalPrice}
                      onChange={(e) => setFormData({...formData, originalPrice: e.target.value})}
                      placeholder="原价"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="currentPrice">现价 (每周)*</Label>
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
                      id="currentPrice"
                      type="number"
                      value={formData.currentPrice}
                      onChange={(e) => setFormData({...formData, currentPrice: e.target.value})}
                      placeholder="现价"
                    />
                  </div>
                </div>
              </div>

              {/* 公寓设施 */}
              <div>
                <Label>公寓设施</Label>
                <div className="grid grid-cols-3 gap-3 mt-2">
                  {FACILITIES.map(facility => (
                    <div key={facility} className="flex items-center gap-2">
                      <Checkbox
                        id={facility}
                        checked={formData.facilities.includes(facility)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData({...formData, facilities: [...formData.facilities, facility]});
                          } else {
                            setFormData({...formData, facilities: formData.facilities.filter(f => f !== facility)});
                          }
                        }}
                      />
                      <Label htmlFor={facility} className="cursor-pointer text-sm">{facility}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* 详细描述 */}
              <div>
                <Label htmlFor="description">详细描述*</Label>
                <Textarea
                  id="description"
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                placeholder="例如：走路八分钟到唐人街，是否有独立洗衣机，周围是否有中超中餐厅超市，是否可以养猫，是否优先考虑长租等"
                rows={4}
              />
              </div>

              {/* 转租原因 */}
              <div>
                <Label htmlFor="reason">转租原因</Label>
                <Textarea
                  id="reason"
                  value={formData.reason}
                  onChange={(e) => setFormData({...formData, reason: e.target.value})}
                  placeholder="例如：假期回国等"
                  rows={2}
                />
              </div>

              {/* 可接受入住人群 */}
              <div>
                <Label>可接受入住人群</Label>
                <div className="space-y-2 mt-2">
                  {["18岁以上学生", "18岁以下学生", "非学生"].map(group => (
                    <div key={group} className="flex items-center gap-2">
                      <Checkbox
                        id={group}
                        checked={formData.acceptableGroups.includes(group)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setFormData({...formData, acceptableGroups: [...formData.acceptableGroups, group]});
                          } else {
                            setFormData({...formData, acceptableGroups: formData.acceptableGroups.filter(g => g !== group)});
                          }
                        }}
                      />
                      <Label htmlFor={group} className="cursor-pointer">{group}</Label>
                    </div>
                  ))}
                </div>
              </div>

              {/* 预订渠道 */}
              <div>
                <Label htmlFor="bookingChannel">预订渠道</Label>
                <Select value={formData.bookingChannel} onValueChange={(value) => setFormData({...formData, bookingChannel: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="请选择预订渠道" />
                  </SelectTrigger>
                  <SelectContent>
                    {BOOKING_CHANNELS.map(channel => (
                      <SelectItem key={channel} value={channel}>{channel}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* 照片上传 */}
              <div>
                <Label>照片*（添加更多实拍图可提升35%的租房成功率）</Label>
                <div className="mt-2">
                  <label className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-orange-500 transition-colors">
                    <div className="text-center">
                      <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                      <span className="text-sm text-gray-600">点击上传，请上传实拍图</span>
                      {uploading && <p className="text-xs text-orange-500 mt-1">上传中...</p>}
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      accept="image/*"
                      multiple
                      onChange={handleImageUpload}
                      disabled={uploading}
                    />
                  </label>

                  {/* 图片预览 */}
                  {imagePreviews.length > 0 && (
                    <div className="grid grid-cols-4 gap-4 mt-4">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="relative group">
                          <img
                            src={preview}
                            alt={`预览 ${index + 1}`}
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* 提示信息 */}
              <div className="bg-gradient-to-r from-orange-50 to-yellow-50 border border-orange-200 rounded-lg p-6">
                <h3 className="font-semibold text-orange-600 mb-2">提交后我们将为您提供：</h3>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li>• 全网平台矩阵推广，覆盖数万留学生用户</li>
                  <li>• AI智能匹配 + 人工精准筛选，快速找到合适租客</li>
                  <li>• 专业顾问全程跟进，从发布到成交一站式服务</li>
                  <li>• 24小时内响应，平均转租周期仅7天</li>
                </ul>
              </div>

              {/* 协议确认 */}
              <div className="flex items-start gap-2">
                <Checkbox
                  id="agreeTerms"
                  checked={formData.agreeTerms}
                  onCheckedChange={(checked) => setFormData({...formData, agreeTerms: checked as boolean})}
                />
                <Label htmlFor="agreeTerms" className="cursor-pointer text-sm">
                  我已阅读并同意《信息安全与隐私保护》、《Cookie政策》《用户服务协议》和《免责声明》
                </Label>
              </div>
            </div>

            {/* 提交按钮 */}
            <div className="flex justify-center pt-6">
              <Button
                type="submit"
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-12"
                disabled={createListing.isPending}
              >
                {createListing.isPending ? "发布中..." : "立即发布"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
}
