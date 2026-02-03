import { trpc } from "@/lib/trpc";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Quote } from "lucide-react";

export default function Reviews() {
  const { data: reviews, isLoading } = trpc.reviews.getAll.useQuery();

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-[#FF6700] to-[#FF8533] text-white py-16">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <Quote className="w-10 h-10" />
            用户真实评价
          </h1>
          <p className="text-lg text-orange-100">
            来自全球留学生的真实反馈，见证我们的专业服务
          </p>
        </div>
      </div>

      {/* 评价列表 */}
      <div className="container py-12">
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6700]"></div>
            <p className="mt-4 text-gray-600">加载中...</p>
          </div>
        ) : reviews && reviews.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review: any) => (
              <Card key={review.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  {/* 评分 */}
                  <div className="flex items-center gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>

                  {/* 评价内容 */}
                  <blockquote className="text-gray-700 mb-4 leading-relaxed">
                    "{review.content}"
                  </blockquote>

                  {/* 用户信息 */}
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div>
                      <p className="font-semibold text-gray-900">
                        {review.userName || "匿名用户"}
                      </p>
                      {review.city && (
                        <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                          <MapPin className="w-3 h-3" />
                          {review.city}
                        </div>
                      )}
                    </div>
                    <Badge variant="secondary" className="bg-orange-100 text-[#FF6700]">
                      {review.rating}分
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="py-12">
            <CardContent className="text-center">
              <Quote className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">暂无评价</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
