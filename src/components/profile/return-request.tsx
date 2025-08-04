"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Shield, Package, RotateCcw } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Step1Form } from "./return-request/Step1Form";
import { Step2Form } from "./return-request/Step2Form";
import { Step3Success } from "./return-request/Step3Form";
import { useMutation } from "@tanstack/react-query";
import { returnApi } from "@/services/return-request";
import { ReturnRequestResponse } from "@/types/return-request";

interface ReturnRequestDialogProps {
  productData?: {
    orderId: string;
    orderItemId: string;
  };
}

export function ReturnRequestDialog({ productData }: ReturnRequestDialogProps) {
  const [open, setOpen] = useState(false);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<any>({
    orderId: productData?.orderId || "",
    orderItemId: productData?.orderItemId || "",
    returnQuantity: 1,
    reason: "",
    images: [],
  });

  const [returnId, setReturnId] = useState<string | null>(null);

  const createReturnRequest = useMutation({
    mutationFn: async (data: any) => await returnApi.createRequestReturn(data),
    onSuccess: (res: ReturnRequestResponse) => {
      console.log(`Return request created:`, res);
      setCurrentStep(3);
      setReturnId(res.data.item.id);
    },
    onError: (error: any) => {
      console.error("Error creating return request:", error);
    },
  });

  const defaultProduct = {
    orderId: "ORD-123456",
    orderItemId: "ITEM-789012",
    returnQuantity: 1,
    reason: "",
    images: [],
  };

  const product = productData || defaultProduct;

  const handleClose = () => {
    setTimeout(() => {
      setCurrentStep(1);
      setFormData({
        orderId: product.orderId,
        orderItemId: product.orderItemId,
        returnQuantity: 1,
        reason: "",
        images: [],
      });
    }, 300);
  };

  const handleSubmit = async () => {
    const finalReason =
      formData.reason === "other"
        ? formData.description?.trim()
        : formData.reason;

    if (!finalReason) {
      alert("Vui lòng chọn hoặc nhập lý do đổi trả.");
      return;
    }

    const payload = {
      orderId: formData.orderId,
      orderItemId: formData.orderItemId,
      returnQuantity: formData.returnQuantity,
      reason: finalReason,
      images: formData.images || [],
    };

    console.log("Submitting payload", payload);

    await createReturnRequest.mutateAsync(payload);
    setCurrentStep(3);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="lg" className="w-full">
          <RotateCcw className="w-4 h-4 mr-2" />
          Đổi trả
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl max-h-[90vh]">
        <DialogHeader>
          <div className="flex justify-between items-start">
            <div>
              <DialogTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Đổi Trả Hàng
                {currentStep < 3 && (
                  <Badge variant="outline">Bước {currentStep} của 2</Badge>
                )}
              </DialogTitle>
              <DialogDescription>
                {currentStep === 1 && "Vui lòng cung cấp thông tin đổi trả"}
                {currentStep === 2 && "Thông tin bổ sung & chi tiết liên hệ"}
                {currentStep === 3 && "Yêu cầu đã được gửi thành công"}
              </DialogDescription>
            </div>
            {/* <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button> */}
          </div>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-4">
          {currentStep === 1 && (
            <Step1Form
              formData={formData}
              setFormData={setFormData}
              product={product}
            />
          )}
          {currentStep === 2 && (
            <Step2Form formData={formData} setFormData={setFormData} />
          )}
          {currentStep === 3 && <Step3Success returnId={returnId} />}
        </ScrollArea>

        <div className="flex justify-between pt-4 border-t">
          {currentStep === 1 && (
            <>
              <Button variant="outline" onClick={handleClose}>
                Hủy
              </Button>
              <Button
                onClick={() => setCurrentStep(2)}
                disabled={!formData.reason}
              >
                Bước Tiếp
              </Button>
            </>
          )}
          {currentStep === 2 && (
            <>
              <Button variant="outline" onClick={() => setCurrentStep(1)}>
                Quay lại
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={createReturnRequest.isPending}
              >
                {createReturnRequest.isPending
                  ? "Đang gửi..."
                  : "Gửi yêu cầu đổi trả"}
              </Button>
            </>
          )}
          {currentStep === 3 && (
            <Button onClick={handleClose} className="w-full">
              Đóng
            </Button>
          )}
        </div>

        {currentStep < 3 && (
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-start gap-2">
              <Shield className="w-4 h-4 text-blue-600 mt-0.5" />
              <div className="text-sm">
                <p className="font-medium text-blue-900">
                  7 Ngày Đổi Trả Hàng Miễn Phí
                </p>
                <p className="text-blue-700">
                  Đổi trả miễn phí trong vòng 7 ngày. Yêu cầu bao bì gốc.
                </p>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
