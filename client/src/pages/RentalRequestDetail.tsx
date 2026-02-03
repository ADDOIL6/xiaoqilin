import { useRoute } from "wouter";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { MapPin, Calendar, DollarSign, User, MessageCircle, ArrowLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "wouter";

export default function RentalRequestDetail() {
  const [, params] = useRoute("/rental-requests/:id");
  const id = params?.id;

  const { data: request, isLoading } = trpc.rentalRequests.getById.useQuery(
    { id: id || "" },
    { enabled: !!id }
  );

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        <Navbar />
        <div className="container py-8">
          <Skeleton className="h-8 w-48 mb-4" />
          <Card>
            <CardContent className="p-8">
              <Skeleton className="h-6 w-3/4 mb-4" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-2/3" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!request) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
        <Navbar />
        <div className="container py-8">
          <Card className="p-12">
            <div className="text-center text-gray-500">
              <p className="text-lg font-medium mb-2">求租信息不存在</p>
              <Link href="/rental-requests">
                <Button className="mt-4 bg-orange-500 hover:bg-orange-600">
                  返回求租列表
                </Button>
              </Link>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  const gender = request.gender || (request.userName?.includes('李') || request.userName?.includes('张') ? 'female' : 'male');

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Navbar />
      
      <div className="container py-8">
        {/* 返回按钮 */}
        <Link href="/rental-requests">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            返回求租列表
          </Button>
        </Link>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* 主要内容 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 基本信息 */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-6">
                  <div className={`w-16 h-16 rounded-full ${gender === 'female' ? 'bg-pink-100' : 'bg-blue-100'} flex items-center justify-center flex-shrink-0`}>
                    <User className={`h-8 w-8 ${gender === 'female' ? 'text-pink-600' : 'text-blue-600'}`} />
                  </div>
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">
                      {request.city}, {request.country}
                    </h1>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="font-semibold">{request.userName || request.user?.name || "求租者"}</span>
                      <span>•</span>
                      <span>{format(new Date(request.createdAt), "yyyy-MM-dd")}</span>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center text-gray-700">
                    <MapPin className="h-5 w-5 mr-3 text-orange-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">期望地点</p>
                      <p className="font-semibold">{request.city}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <Calendar className="h-5 w-5 mr-3 text-orange-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">入住日期</p>
                      <p className="font-semibold">{format(new Date(request.moveInDate), "yyyy-MM-dd")}</p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <DollarSign className="h-5 w-5 mr-3 text-orange-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">预算范围</p>
                      <p className="font-semibold text-orange-600">
                        {request.currency === "GBP" ? "£" : request.currency === "USD" ? "$" : "¥"}
                        {request.budget}/周
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center text-gray-700">
                    <User className="h-5 w-5 mr-3 text-orange-500" />
                    <div>
                      <p className="text-sm text-muted-foreground">房型要求</p>
                      <p className="font-semibold">{request.propertyType || request.propertyTypes?.[0] || "不限"}</p>
                    </div>
                  </div>
                </div>

                {(request.propertyType || (request.propertyTypes && request.propertyTypes.length > 0)) && (
                  <div className="mb-6">
                    <p className="text-sm text-muted-foreground mb-2">房型偏好</p>
                    <div className="flex flex-wrap gap-2">
                      {request.propertyType && (
                        <Badge variant="secondary" className="text-sm">
                          {request.propertyType}
                        </Badge>
                      )}
                      {request.propertyTypes && request.propertyTypes.map((type: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-sm">
                          {type}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {request.description && (
                  <div>
                    <h3 className="font-semibold text-lg mb-3">详细描述</h3>
                    <div className="prose prose-sm max-w-none text-gray-700 whitespace-pre-wrap">
                      {request.description}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* 侧边栏 */}
          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardContent className="p-6">
                <div className="bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl p-6 text-white mb-4">
                  <h3 className="text-xl font-bold mb-2">联系小麒麟客服</h3>
                  <p className="text-sm text-orange-50 mb-4">
                    专业客服团队为您提供一对一服务
                  </p>
                  <Button 
                    className="w-full bg-white text-orange-600 hover:bg-orange-50 font-semibold"
                    onClick={() => window.location.href = "/contact"}
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    立即咨询
                  </Button>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>安全提示：</strong>请通过平台客服联系，保护个人信息安全。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
