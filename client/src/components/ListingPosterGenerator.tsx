import { useEffect, useRef, useState } from "react";
import html2canvas from "html2canvas";
import QRCode from "qrcode";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

interface ListingData {
  // 基本信息
  country: string;
  city: string;
  address: string;
  postcode?: string;
  propertyName?: string;
  
  // 租期和价格
  startDate: string;
  endDate?: string;
  originalPrice: string;
  currentPrice: string;
  
  // 房型信息
  roomType: string;
  roomName?: string;
  floor?: string;
  
  // 设施
  facilities: string[];
  
  // 描述
  description: string;
  reason: string; // 转租原因（背景故事）
  
  // 图片
  images: string[];
  
  // 联系方式
  wechatId: string;
}

interface ListingPosterGeneratorProps {
  data: ListingData;
  onDownload?: () => void;
}

export default function ListingPosterGenerator({ data, onDownload }: ListingPosterGeneratorProps) {
  const posterRef = useRef<HTMLDivElement>(null);
  const qrCanvasRef = useRef<HTMLCanvasElement>(null);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (qrCanvasRef.current) {
      QRCode.toCanvas(
        qrCanvasRef.current,
        `weixin://contacts/profile/${data.wechatId}`,
        {
          width: 200,
          margin: 1,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        }
      );
    }
  }, [data.wechatId]);

  const handleGenerate = async () => {
    if (!posterRef.current) return;

    setIsGenerating(true);
    try {
      // 等待所有图片加载完成
      const images = posterRef.current.querySelectorAll('img');
      await Promise.all(
        Array.from(images).map((img) => {
          if (img.complete) return Promise.resolve();
          return new Promise((resolve, reject) => {
            img.onload = resolve;
            img.onerror = reject;
            // 设置超时
            setTimeout(() => resolve(undefined), 5000);
          });
        })
      );

      // 等待一小段时间确保渲染完成
      await new Promise(resolve => setTimeout(resolve, 500));

      const canvas = await html2canvas(posterRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        logging: false,
      });

      const imageUrl = canvas.toDataURL("image/png");
      setGeneratedImage(imageUrl);
      onDownload?.();
    } catch (error) {
      console.error("生成长图失败:", error);
      alert("生成失败，请重试");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-4">
      {!generatedImage ? (
        <div className="flex justify-center">
          <Button 
            onClick={handleGenerate} 
            disabled={isGenerating}
            className="bg-orange-500 hover:bg-orange-600"
          >
            <Download className="w-4 h-4 mr-2" />
            {isGenerating ? "生成中..." : "生成长图"}
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
            <p className="text-blue-800 font-medium">📱 iPhone 用户：长按下方图片，选择“存储图片”即可保存到相册</p>
            <p className="text-blue-600 text-sm mt-1">💻 桌面用户：右键图片选择“图片另存为”</p>
          </div>
          <div className="flex justify-center">
            <Button 
              onClick={() => setGeneratedImage(null)} 
              variant="outline"
              className="mr-2"
            >
              重新生成
            </Button>
          </div>
          <div className="flex justify-center">
            <img 
              src={generatedImage} 
              alt="房源长图" 
              className="max-w-full shadow-2xl rounded-lg"
              style={{ width: '375px' }}
            />
          </div>
        </div>
      )}

      <div 
        ref={posterRef} 
        className="bg-white w-[375px] mx-auto shadow-2xl"
        style={{ display: generatedImage ? 'none' : 'block' }}
      >
        {/* Logo和标题 */}
        <div className="bg-gradient-to-r from-orange-400 to-orange-500 text-white p-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-3xl">🦁</span>
            <h1 className="text-xl font-bold">洪转学长</h1>
          </div>
          <p className="text-sm opacity-90">留学生转租专业平台</p>
        </div>

        {/* 标题 */}
        <div className="p-6 bg-orange-50">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            {data.city}{data.propertyName ? ` ${data.propertyName}` : ''}高转租
          </h2>
        </div>

        {/* 租期 */}
        <div className="px-6 py-4 border-b">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl">📅</span>
            <h3 className="font-bold text-lg">租期时间</h3>
          </div>
          <p className="text-center text-gray-700">
            {data.startDate} - {data.endDate || '长期'}
          </p>
        </div>

        {/* 房型 */}
        <div className="px-6 py-4 border-b">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl">🏠</span>
            <h3 className="font-bold text-lg">房型</h3>
          </div>
          <p className="text-center text-gray-700">{data.roomType}</p>
        </div>

        {/* 价格 */}
        <div className="px-6 py-4 border-b bg-orange-50">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl">💰</span>
            <h3 className="font-bold text-lg">价格</h3>
          </div>
          <p className="text-center">
            <span className="text-sm text-gray-500 line-through">${data.originalPrice} 每月</span>
            <br />
            <span className="text-2xl font-bold text-orange-600">${data.currentPrice}</span>
            <span className="text-gray-600"> 每月</span>
          </p>
        </div>

        {/* 地址 */}
        <div className="px-6 py-4 border-b">
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="text-2xl">📍</span>
            <h3 className="font-bold text-lg">地址</h3>
          </div>
          <p className="text-center text-gray-700 text-sm">
            {data.address}
            {data.postcode && `, ${data.postcode}`}
          </p>
        </div>

        {/* 背景故事 */}
        {data.reason && (
          <div className="px-6 py-4 border-b bg-yellow-50">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-2xl">📖</span>
              <h3 className="font-bold text-lg">背景故事</h3>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
              {data.reason}
            </p>
          </div>
        )}

        {/* 房型详情 */}
        {(data.roomName || data.floor) && (
          <div className="px-6 py-4 border-b">
            <h3 className="font-bold text-lg mb-3">🏘 房型详情</h3>
            <div className="space-y-1 text-sm text-gray-700">
              {data.roomName && <p>• 房间名：{data.roomName}</p>}
              {data.floor && <p>• 楼层：{data.floor}</p>}
            </div>
          </div>
        )}

        {/* 设施配套 */}
        {data.facilities.length > 0 && (
          <div className="px-6 py-4 border-b">
            <h3 className="font-bold text-lg mb-3">✨ 小区配套</h3>
            <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
              {data.facilities.map((facility, index) => (
                <div key={index} className="flex items-center gap-1">
                  <span className="text-orange-500">✓</span>
                  <span>{facility}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 房源描述 */}
        {data.description && (
          <div className="px-6 py-4 border-b">
            <h3 className="font-bold text-lg mb-3">📝 房源描述</h3>
            <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
              {data.description}
            </p>
          </div>
        )}

        {/* 房源照片 */}
        {data.images.length > 0 && (
          <div className="px-6 py-4 border-b">
            <h3 className="font-bold text-lg mb-3">📷 房源照片</h3>
            <div className="space-y-3">
              {data.images.slice(0, 6).map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`房源照片${index + 1}`}
                  className="w-full rounded-lg"
                  crossOrigin="anonymous"
                />
              ))}
            </div>
          </div>
        )}

        {/* 二维码和联系方式 */}
        <div className="px-6 py-8 bg-gradient-to-b from-white to-orange-50">
          <h3 className="font-bold text-xl text-center mb-4">扫描二维码联系客服</h3>
          <div className="flex justify-center mb-4">
            <div className="bg-white p-3 rounded-lg shadow-lg">
              <canvas ref={qrCanvasRef} />
            </div>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-1">微信号</p>
            <p className="text-xl font-bold text-orange-600">{data.wechatId}</p>
          </div>
          <p className="text-xs text-center text-gray-500 mt-4">
            小麒麟转租通，转租我们更专业，保证您的押金与租金安全
          </p>
        </div>
      </div>
    </div>
  );
}
