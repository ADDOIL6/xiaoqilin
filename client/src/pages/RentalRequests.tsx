import { useState } from "react";
import { Link } from "wouter";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { trpc } from "@/lib/trpc";
import { MapPin, Calendar, DollarSign, User, Search, MessageCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Skeleton } from "@/components/ui/skeleton";
import ContactDialog from "@/components/ContactDialog";

export default function RentalRequests() {
  const [searchCity, setSearchCity] = useState("");
  const [country, setCountry] = useState<string>("");
  const [contactDialogOpen, setContactDialogOpen] = useState(false);

  const { data: requests, isLoading } = trpc.rentalRequests.list.useQuery({ limit: 100, offset: 0 });

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      <Navbar />
      
      <div className="container py-8">
        {/* 页面标题 */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">求租信息</h1>
            <p className="text-gray-600">浏览留学生的求租需求，快速匹配合适的租客</p>
          </div>
          <Link href="/publish/request">
            <Button className="bg-orange-500 hover:bg-orange-600">
              发布求租
            </Button>
          </Link>
        </div>

        {/* 搜索筛选 */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="flex gap-4">
              <div className="flex-1">
                <Input
                  placeholder="搜索城市..."
                  value={searchCity}
                  onChange={(e) => setSearchCity(e.target.value)}
                  className="w-full"
                />
              </div>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="选择国家" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">全部国家</SelectItem>
                  <SelectItem value="英国">英国</SelectItem>
                  <SelectItem value="美国">美国</SelectItem>
                  <SelectItem value="澳洲">澳洲</SelectItem>
                  <SelectItem value="加拿大">加拿大</SelectItem>
                </SelectContent>
              </Select>
              <Button className="bg-orange-500 hover:bg-orange-600">
                <Search className="w-4 h-4 mr-2" />
                搜索
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* 求租列表 */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-6 w-3/4" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-4 w-full mb-2" />
                  <Skeleton className="h-4 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : requests && requests.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {requests.map((request, index) => {
              // 根据索引判断性别，偶数为女生，奇数为男生
              const gender = index % 2 === 0 ? 'female' : 'male';
              return (
              <Link key={request.id} href={`/rental-requests/${request.id}`}>
                <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardHeader>
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className={`w-10 h-10 rounded-full ${gender === 'female' ? 'bg-pink-100' : 'bg-blue-100'} flex items-center justify-center`}>
                          <User className={`h-5 w-5 ${gender === 'female' ? 'text-pink-600' : 'text-blue-600'}`} />
                        </div>
                      <div>
                        <p className="font-semibold">{request.userName || request.user?.name || "求租者"}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(request.createdAt), "yyyy-MM-dd")}
                        </p>
                      </div>
                    </div>
                  </div>
                  <CardTitle className="text-lg">
                    {request.city}, {request.country}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-2" />
                    {request.city}
                  </div>

                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4 mr-2" />
                    {format(new Date(request.moveInDate), "yyyy-MM-dd")}
                    {request.moveOutDate && ` - ${format(new Date(request.moveOutDate), "yyyy-MM-dd")}`}
                  </div>

                  <div className="flex items-center text-sm font-semibold text-orange-600">
                    <DollarSign className="h-4 w-4 mr-1" />
                    预算: {request.currency === "GBP" ? "£" : request.currency === "USD" ? "$" : "¥"}
                    {request.budget}/周
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {request.propertyType && (
                      <Badge variant="secondary">
                        {request.propertyType}
                      </Badge>
                    )}
                    {request.propertyTypes && request.propertyTypes.length > 0 && request.propertyTypes.slice(0, 2).map((type: string, index: number) => (
                      <Badge key={index} variant="secondary">
                        {type}
                      </Badge>
                    ))}
                    {request.propertyTypes && request.propertyTypes.length > 2 && (
                      <Badge variant="secondary">+{request.propertyTypes.length - 2}</Badge>
                    )}
                  </div>

                  {request.description && (
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {request.description}
                    </p>
                  )}

                  <Button 
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white mt-4"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      window.location.href = "/contact";
                    }}
                  >
                    <MessageCircle className="mr-2 h-4 w-4" />
                    联系客服咨询
                  </Button>
                </CardContent>
              </Card>
            </Link>
              );
            })}
          </div>
        ) : (
          <Card className="p-12">
            <div className="text-center text-gray-500">
              <Search className="h-16 w-16 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium mb-2">暂无求租信息</p>
              <p className="text-sm">调整筛选条件或稍后再试</p>
            </div>
          </Card>
        )}
      </div>

      <ContactDialog 
        open={contactDialogOpen} 
        onOpenChange={setContactDialogOpen}
        title="发布求租信息"
        description="添加微信客服，告诉我们您的租房需求，我们将帮助您快速匹配合适的房源"
      />
    </div>
  );
}
