import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// 修复Leaflet默认图标问题
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

interface GoogleMapProps {
  latitude: number;
  longitude: number;
  address: string;
}

export default function GoogleMap({ latitude, longitude, address }: GoogleMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
  const directionsLink = `https://www.google.com/maps/dir/?api=1&destination=${latitude},${longitude}`;

  // Mapbox Token (用户自己的Token)
  const MAPBOX_TOKEN = "pk.eyJ1IjoiMXZlYjYiLCJhIjoiY21sNHhhdWFwMDBsODNncHU5Z3RtNGZsciJ9.Yrl4KD7r-C5IiTZwf89e9g";

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // 显示加载状态
    setIsLoading(true);

    // 创建地图实例
    const map = L.map(mapRef.current, {
      preferCanvas: true,
      zoomControl: true,
    }).setView([latitude, longitude], 13);

    // 使用Mapbox瓦片服务（全球CDN加速，速度快）
    const tileLayer = L.tileLayer(
      `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=${MAPBOX_TOKEN}`,
      {
        attribution: '© <a href="https://www.mapbox.com/about/maps/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        tileSize: 512,
        zoomOffset: -1,
        maxZoom: 19,
        minZoom: 10,
      }
    );

    // 监听瓦片加载完成事件
    let tilesLoaded = 0;
    let totalTiles = 0;

    tileLayer.on('tileloadstart', () => {
      totalTiles++;
    });

    tileLayer.on('tileload', () => {
      tilesLoaded++;
      if (tilesLoaded >= totalTiles) {
        setIsLoading(false);
      }
    });

    tileLayer.on('tileerror', () => {
      tilesLoaded++;
      if (tilesLoaded >= totalTiles) {
        setIsLoading(false);
      }
    });

    tileLayer.on('load', () => {
      setIsLoading(false);
    });

    tileLayer.addTo(map);

    // 添加标记
    const marker = L.marker([latitude, longitude]).addTo(map);
    marker.bindPopup(`<b>${address}</b>`).openPopup();

    mapInstanceRef.current = map;

    // 清理函数
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [latitude, longitude, address, MAPBOX_TOKEN]);

  return (
    <div className="space-y-4">
      <div className="flex items-start gap-2">
        <MapPin className="h-5 w-5 text-primary mt-0.5" />
        <div className="flex-1">
          <p className="text-sm text-muted-foreground">公寓位置</p>
          <p className="font-medium">{address}</p>
          <p className="text-xs text-muted-foreground mt-1">
            坐标: {Number(latitude).toFixed(6)}°N {Math.abs(Number(longitude)).toFixed(6)}°W
          </p>
        </div>
      </div>
      <div className="aspect-video bg-muted rounded-lg overflow-hidden relative group">
        {/* 加载状态 */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-[999]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-2"></div>
              <p className="text-sm text-gray-600">加载地图中...</p>
            </div>
          </div>
        )}
        <div ref={mapRef} className="w-full h-full" />
        {/* 悬浮按钮 */}
        <div className="absolute bottom-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity z-[1000]">
          <a
            href={googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            在Google Maps中查看
          </a>
          <a
            href={directionsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-3 py-2 rounded-lg shadow-lg text-sm font-medium hover:bg-blue-600 transition-colors"
          >
            获取路线
          </a>
        </div>
      </div>
    </div>
  );
}
