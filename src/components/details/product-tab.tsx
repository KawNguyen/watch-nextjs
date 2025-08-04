"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Store,
  Globe,
  Circle,
  Link,
  Ruler,
  Users,
  Droplets,
  Shield,
  Cog,
} from "lucide-react";

interface ProductTabsProps {
  description?: string;
  brand?: { name: string; country?: string };
  movement?: { name: string };
  material?: { name: string };
  bandMaterial?: { name: string };
  diameter?: number;
  gender?: string;
  warranty?: number;
  waterResistance?: number;
}
export function ProductTabs({
  description,
  brand,
  movement,
  material,
  bandMaterial,
  diameter,
  gender,
  warranty,
  waterResistance,
}: ProductTabsProps) {
  return (
    <div className="w-full">
      <Tabs defaultValue="specifications" className="w-full">
        <TabsList className="w-full grid grid-cols-2 gap-4">
          <TabsTrigger value="specifications" className="text-base">
            Thông Số Kỹ Thuật
          </TabsTrigger>
          <TabsTrigger value="description" className="text-base">
            Mô Tả
          </TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          <div className="bg-white rounded-lg p-6 shadow-sm mt-4">
            <p className="text-gray-600 leading-relaxed">{description}</p>
          </div>
        </TabsContent>
        <TabsContent value="specifications">
          <div className="bg-white rounded-lg p-6 shadow-sm mt-4">
            <div className="grid grid-cols-2 gap-6">
              <div className="font-medium text-gray-900 flex items-center gap-2">
                <Store className="h-4 w-4" /> Thương Hiệu
              </div>
              <div className="text-gray-600">{brand?.name}</div>
              <div className="font-medium text-gray-900 flex items-center gap-2">
                <Globe className="h-4 w-4" /> Quốc Gia
              </div>
              <div className="text-gray-600">{brand?.country}</div>
              <div className="font-medium text-gray-900 flex items-center gap-2">
                <Cog className="h-4 w-4" /> Chuyển động
              </div>
              <div className="text-gray-600">{movement?.name}</div>
              <div className="font-medium text-gray-900 flex items-center gap-2">
                <Circle className="h-4 w-4" /> Vật Liệu Vỏ
              </div>
              <div className="text-gray-600">{material?.name}</div>
              <div className="font-medium text-gray-900 flex items-center gap-2">
                <Link className="h-4 w-4" /> Vật Liệu Dây
              </div>
              <div className="text-gray-600">{bandMaterial?.name}</div>
              <div className="font-medium text-gray-900 flex items-center gap-2">
                <Ruler className="h-4 w-4" /> Đường Kính Case
              </div>
              <div className="text-gray-600">{diameter}mm</div>
              <div className="font-medium text-gray-900 flex items-center gap-2">
                <Users className="h-4 w-4" /> Giới Tính
              </div>
              <div className="text-gray-600">{gender}</div>
              <div className="font-medium text-gray-900 flex items-center gap-2">
                <Droplets className="h-4 w-4" /> Khả Năng Chống Nước
              </div>
              <div className="text-gray-600">{waterResistance}m</div>
              <div className="font-medium text-gray-900 flex items-center gap-2">
                <Shield className="h-4 w-4" /> Bảo Hành
              </div>
              <div className="text-gray-600">{warranty} tháng</div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
