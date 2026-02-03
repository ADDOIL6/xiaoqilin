import { useRoute } from "wouter";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { MapPin, Calendar, Home, Heart, MessageCircle, Eye, Share2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { useAuth } from "@/_core/hooks/useAuth";
import { toast } from "sonner";
import { useState } from "react";

export default function ListingDetailEnhanced() {
  const [, params] = useRoute("/listings/:id");
  const id = params?.id ? parseInt(params.id) : 0;
  const { isAuthenticated } = useAuth();
  const utils = trpc.useUtils();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const { data: listing, isLoading } = trpc.listings.getById.useQuery({ id });

  const addFavorite = trpc.favorites.add.useMutation({
    onSuccess: () => {
      toast.success("已添加到收藏");
      utils.listings.getById.invalidate({ id });
    },
    onError: () => {
      toast.error("添加收藏失败");
    },
  });

  const removeFavorite = trpc.favorites.remove.useMutation({
    onSuccess: () => {
      toast.success("已取消收藏");
      utils.listings.getById.invalidate({ id });
    },
    onError: () => {
      toast.error("取消收藏失败");
    },
  });

  const handleFavoriteToggle = () => {
    if (!isAuthenticated) {
      toast.error("请先登录");
      return;
    }

    if (listing?.isFavorited) {
      removeFavorite.mutate({ listingId: id });
    } else {
      addFavorite.mutate({ listingId: id });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: listing?.title,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success("链接已复制到剪贴板");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-8">
          <Skeleton className="h-96 w-full mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              <Skeleton className="h-32 w-full" />
              <Skeleton className="h-64 w-full" />
            </div>
            <div>
              <Skeleton className="h-96 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container py-8 text-center">
          <h1 className="text-2xl font-bold">房源不存在</h1>
        </div>
      </div>
    );
  }

  const amenitiesList = listing.amenities ? JSON.parse(listing.amenities as string) : [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container py-8">
        {/* Media Gallery - Video and Images */}
        <div className="mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            {/* Main Media Display */}
            <div className="lg:col-span-3">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden relative">
                {listing.hasVideo && listing.videoUrl && selectedImageIndex === -1 ? (
                  <video
                    src={listing.videoUrl}
                    controls
                    className="w-full h-full object-cover"
                  />
                ) : listing.images && listing.images.length > 0 ? (
                  <img
                    src={listing.images[Math.max(0, selectedImageIndex)]?.imageUrl}
                    alt={listing.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Home className="h-24 w-24 text-muted-foreground" />
                  </div>
                )}
              </div>
              
              {/* Media Counter */}
              <div className="flex gap-2 mt-2">
                {listing.images && listing.images.length > 0 && (
                  <Badge variant="secondary" className="bg-white/90">
                    {listing.images.length} 张图
                  </Badge>
                )}
                {listing.hasVideo && (
                  <Badge variant="secondary" className="bg-white/90">
                    1 视频
                  </Badge>
                )}
              </div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="lg:col-span-1">
              <div className="flex lg:flex-col gap-2 overflow-x-auto lg:overflow-y-auto lg:max-h-[500px]">
                {listing.hasVideo && listing.videoUrl && (
                  <div
                    className="relative aspect-video lg:aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer flex-shrink-0 w-32 lg:w-full"
                    onClick={() => setSelectedImageIndex(-1)}
                  >
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="w-12 h-12 rounded-full bg-white/90 flex items-center justify-center">
                        <div className="w-0 h-0 border-l-8 border-l-black border-y-6 border-y-transparent ml-1" />
                      </div>
                    </div>
                  </div>
                )}
                {listing.images?.map((image, index) => (
                  <img
                    key={index}
                    src={image.imageUrl}
                    alt={`${listing.title} - ${index + 1}`}
                    className={`aspect-video lg:aspect-square object-cover rounded-lg cursor-pointer flex-shrink-0 w-32 lg:w-full ${
                      selectedImageIndex === index ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setSelectedImageIndex(index)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Title and Badges */}
            <div>
              <h1 className="text-3xl font-bold mb-4">{listing.title}</h1>
              
              {/* Tags/Badges */}
              <div className="flex flex-wrap gap-2 mb-4">
                {listing.isVip && (
                  <Badge className="bg-yellow-500 hover:bg-yellow-600">VIP</Badge>
                )}
                {listing.isVerified && (
                  <Badge className="bg-yellow-500 hover:bg-yellow-600">实拍房源</Badge>
                )}
                {listing.isStudentCertified && (
                  <Badge className="bg-blue-500 hover:bg-blue-600">学生认证</Badge>
                )}
                {listing.apartmentType && (
                  <Badge className="bg-blue-500 hover:bg-blue-600">{listing.apartmentType}</Badge>
                )}
              </div>

              {/* Metadata */}
              <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                {listing.publishedAt && (
                  <div>
                    发布时间：{format(new Date(listing.publishedAt), "yyyy年MM月dd日")}
                  </div>
                )}
                {listing.listingNumber && (
                  <div>ID:{listing.listingNumber}</div>
                )}
                <div className="flex items-center gap-1">
                  <Eye className="h-4 w-4" />
                  浏览次数：{listing.viewCount}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={handleFavoriteToggle}
                  disabled={addFavorite.isPending || removeFavorite.isPending}
                >
                  <Heart className={`h-4 w-4 mr-2 ${listing.isFavorited ? "fill-red-500 text-red-500" : ""}`} />
                  收藏
                </Button>
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  分享
                </Button>
              </div>
            </div>

            {/* Property Info Card */}
            <Card>
              <CardHeader>
                <CardTitle>房源信息</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-muted-foreground">出租时间</p>
                    <p className="font-medium">
                      {format(new Date(listing.availableFrom), "yyyy/MM/dd")}
                      {listing.availableTo && ` - ${format(new Date(listing.availableTo), "yyyy/MM/dd")}`}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">公寓类型</p>
                    <p className="font-medium">{listing.apartmentType || "私人公寓"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">公寓房型</p>
                    <p className="font-medium">
                      {listing.propertyType === "studio" ? "整租套间(Studio)" :
                       listing.propertyType === "1b1b" ? "1个房间 1个厕所(1b1b)" :
                       listing.propertyType === "2b2b" ? "2个房间 2个厕所(2b2b)" :
                       listing.propertyType === "3b3b" ? "3个房间 3个厕所(3b3b)" :
                       listing.propertyType === "4b4b" ? "4个房间 4个厕所(4b4b)" : "其他"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">公寓地址</p>
                    <p className="font-medium">{listing.address}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Description */}
            {listing.description && (
              <Card>
                <CardHeader>
                  <CardTitle>详情描述</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed whitespace-pre-wrap">{listing.description}</p>
                </CardContent>
              </Card>
            )}

            {/* Amenities */}
            {amenitiesList.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>公寓设施</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {amenitiesList.map((amenity: string, index: number) => (
                      <Badge key={index} variant="secondary" className="bg-yellow-100 text-yellow-800">
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    【温馨提示 🔥】房屋内部的设施和家电设备请务必与出租方再行确认！
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Map */}
            {listing.latitude && listing.longitude && (
              <Card>
                <CardHeader>
                  <CardTitle>查看地图</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-2">
                      <MapPin className="h-5 w-5 text-primary mt-0.5" />
                      <div>
                        <p className="text-sm text-muted-foreground">公寓位置</p>
                        <p className="font-medium">{listing.address}</p>
                      </div>
                    </div>
                    <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                      <div className="text-center">
                        <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                        <p className="text-muted-foreground">Google地图功能即将上线</p>
                        <p className="text-sm text-muted-foreground mt-1">
                          坐标: {listing.latitude}, {listing.longitude}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar - Keep original contact section */}
          <div className="space-y-6">
            {/* Price Card */}
            <Card className="sticky top-4">
              <CardContent className="pt-6">
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-red-600 mb-2">
                    {listing.currency === "GBP" ? "£" : listing.currency === "USD" ? "$" : "¥"}
                    {listing.price}
                    <span className="text-base font-normal text-muted-foreground">/周起</span>
                  </div>
                  {listing.owner && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex items-center justify-center gap-3">
                        {listing.owner.avatar && (
                          <img
                            src={listing.owner.avatar}
                            alt={listing.owner.name || "房东"}
                            className="w-12 h-12 rounded-full"
                          />
                        )}
                        <div className="text-left">
                          <p className="font-medium">{listing.owner.name || "房东"}</p>
                          {listing.isStudentCertified && (
                            <Badge variant="secondary" className="text-xs">学生认证</Badge>
                          )}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Contact Card - Original design preserved */}
            <Card className="bg-gradient-to-br from-orange-50 to-yellow-50 border-orange-200">
              <CardHeader>
                <CardTitle className="text-orange-600">联系小麒麟客服</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-orange-100 flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8 text-orange-600" />
                  </div>
                  <p className="text-gray-700 mb-4">
                    想要了解这套房源的详细信息？
                  </p>
                  <p className="text-sm text-gray-600 mb-6">
                    我们的专业顾问将为您提供一对一服务，帮助您快速匹配合适的房源
                  </p>
                  <Button 
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                    size="lg"
                    onClick={() => window.location.href = "/contact"}
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    联系客服咨询
                  </Button>
                  <p className="text-xs text-gray-500 mt-3">
                    7年专业经验 · 24小时内回复
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>安全提示</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>• 请通过平台消息与房东沟通</li>
                  <li>• 看房时注意人身安全</li>
                  <li>• 签约前仔细阅读合同条款</li>
                  <li>• 谨防诈骗，不要提前支付大额费用</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
