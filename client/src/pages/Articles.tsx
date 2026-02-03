import { useState } from "react";
import { Link } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, BookOpen, Calendar, Eye } from "lucide-react";

export default function Articles() {
  const [searchQuery, setSearchQuery] = useState("");

  const { data: articles, isLoading } = trpc.articles.getAll.useQuery();

  // 筛选逻辑
  const filteredArticles = articles?.filter((article: any) => {
    const matchesSearch =
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const categories = {
    housing: "租房攻略",
    life: "生活指南",
    study: "学习经验",
    travel: "旅游出行",
    finance: "理财省钱",
    other: "其他",
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* 头部 */}
      <div className="bg-gradient-to-r from-[#FF6700] to-[#FF8533] text-white py-16">
        <div className="container">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <BookOpen className="w-10 h-10" />
            生活攻略
          </h1>
          <p className="text-lg text-orange-100">
            留学生活经验分享，租房、学习、生活全方位指南
          </p>
        </div>
      </div>

      {/* 搜索 */}
      <div className="container py-8">
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="搜索攻略..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* 攻略列表 */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#FF6700]"></div>
            <p className="mt-4 text-gray-600">加载中...</p>
          </div>
        ) : filteredArticles && filteredArticles.length > 0 ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article: any) => (
              <Card key={article.id} className="hover:shadow-lg transition-shadow flex flex-col">
                {article.coverImage && (
                  <div className="relative h-48 overflow-hidden rounded-t-lg">
                    <img
                      src={article.coverImage}
                      alt={article.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <CardContent className="pt-4 flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-lg line-clamp-2">
                      {article.title}
                    </h3>
                    <Badge variant="outline" className="ml-2 shrink-0">
                      {categories[article.category as keyof typeof categories] ||
                        article.category}
                    </Badge>
                  </div>
                  {article.summary && (
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                      {article.summary}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(article.publishedAt || article.createdAt).toLocaleDateString("zh-CN")}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
                      {article.viewCount || 0} 阅读
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Link href={`/articles/${article.id}`} className="w-full">
                    <Button variant="outline" className="w-full">
                      阅读全文
                    </Button>
                  </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="py-12">
            <CardContent className="text-center">
              <BookOpen className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">暂无攻略文章</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
