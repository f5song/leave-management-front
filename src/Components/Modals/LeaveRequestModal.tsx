"use client"

import type React from "react"
import { useState } from "react"
import DatePicker from "react-datepicker"

import "react-datepicker/dist/react-datepicker.css"
import "../../App.css"
import PrimaryButton from "../PrimaryButton"
import { useMutation } from "@tanstack/react-query"
import { useAuth } from "@/Context/AuthContext"
import { useQueryClient } from "@tanstack/react-query"
import { createLeave } from "@/Api/leave-service"
import { z } from "zod"
import { leaveTypes } from "@/Shared/Constants/leaveType"
import { CloseIcon } from "@/Shared/Asseet/Icons"
import { TextArea } from "../TextArea"


interface LeaveRequestModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  toggleModal: () => void
}


const LeaveRequestModal: React.FC<LeaveRequestModalProps> = ({ isOpen, onClose, title }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [formData, setFormData] = useState({
    leaveTypeId: leaveTypes[0].value,
    title: "",
    description: "",
    startDate: new Date(),
    endDate: new Date(),
  });


  const schema = z.object({
    leaveTypeId: z.string(),
    title: z.string().min(1, "กรุณากรอกหัวข้อการลา"),
    description: z.string(),
    startDate: z.date(),
    endDate: z.date(),
  });

  type LeaveRequestData = z.infer<typeof schema>;

  const onChange = (key: keyof typeof formData, value: any) => setFormData((prev) => ({ ...prev, [key]: value }))

  const mutation = useMutation({
    mutationFn: (data: LeaveRequestData) => createLeave(user?.id!, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendarLeaves', user?.id] });
      onClose();
    },
    onError: (err: unknown) => {
      if (err instanceof Error) {
        console.log(err.message);
      } else {
        console.log("Unexpected error", err);
      }
    }

  });

  const onSubmit = (data: LeaveRequestData) => {
    mutation.mutate(data);
  };

  if (!isOpen) return null

  return (
    <div className="bg-black bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center">
      <div className="relative bg-[#2a2a2a] rounded-[8px] p-8 w-[900px] max-w-[90vw] flex flex-col text-white">
        {/* Header */}
        <div className="flex flex-row justify-between pb-6">
          <p className="font-sukhumvit-bold text-[20px] text-white">{title}</p>
          <div className="flex flex-row items-center cursor-pointer group hover:text-white" onClick={onClose}>
            <CloseIcon className="w-[15px] h-[15px] fill-[#DCDCDC] group-hover:fill-white transition-colors" />
          </div>
        </div>

        <div className="flex flex-row items-center bg-[#1a1a1a] rounded-[4px] p-1 mb-6">
          {leaveTypes.map((item, index) => (
            <div
              key={item.value}
              onClick={() => onChange("leaveTypeId", item.value)}
              className={`flex justify-center items-center rounded-[4px] px-8 py-2 cursor-pointer transition-colors flex-1
                ${formData.leaveTypeId === item.value
                  ? index === 0
                    ? "bg-[#00FFBB] text-[var(--color-secondary)]"
                    : index === 1
                      ? "bg-[#F2FF00] text-[var(--color-secondary)]"
                      : index === 2
                        ? "bg-[#FFFFFF] text-[var(--color-secondary)]"
                        : "bg-[var(--color-secondary)] text-[var(--color-primary)]"
                  : index === 0
                    ? "text-[#00FFBB]"
                    : index === 1
                      ? "text-[#F2FF00]"
                      : index === 2
                        ? "text-[#FFFFFF]"
                        : "text-[var(--color-secondary)]"
                }`}
            >
              <p className="font-sukhumvit-bold text-[16px]">{item.label}</p>
            </div>
          ))}
        </div>

        <form>

          <div className="flex flex-col mb-6">
            <p className="font-sukhumvit text-[16px] text-white mb-3">วันที่ลา*</p>
            <div>
              <DatePicker
                selected={formData.startDate}
                onChange={(dates: [Date | null, Date | null]) => {
                  if (dates) {
                    onChange("startDate", dates[0]);
                    onChange("endDate", dates[1]);
                  }
                }}
                startDate={formData.startDate}
                endDate={formData.endDate}
                selectsRange
                monthsShown={2}
                showPopperArrow={false}
                inline
                locale="th"
                calendarClassName="custom-calendar-full-width"
                className="rounded-[4px] p-4 w-full"
              />

            </div>
          </div>

          <div className="flex flex-col mb-8">
            <p className="font-sukhumvit text-[16px] text-white mb-3">หัวข้อการลา*</p>
            <div className="bg-[#1a1a1a] rounded-[4px]">
              <TextArea
                placeholder="กรอกหัวข้อการลา"
                value={formData.title}
                onChange={(e) => onChange("title", e.target.value)}
                rows={1}
                cols={100}
              />

            </div>
            <p className="font-sukhumvit text-[16px] text-white mb-3 mt-3">สาเหตุที่ลา*</p>
            <div className="bg-[#1a1a1a] rounded-[4px]">
              <TextArea
                placeholder="กรอกสาเหตุการลา"
                value={formData.description}
                onChange={(e) => onChange("description", e.target.value)}
                rows={5}
                cols={100}
              />
            </div>
          </div>

          <div className="flex flex-row justify-end gap-3">
            <button
              onClick={() => setFormData({
                leaveTypeId: leaveTypes[0].value,
                title: "",
                description: "",
                startDate: new Date(),
                endDate: new Date(),
              })}
              className="font-sukhumvit-semibold text-[16px] cursor-pointer text-primary hover:text-black px-6 py-2 rounded-[4px] transition-colors"
            >
              ล้างข้อมูล
            </button>
            <PrimaryButton
              onClick={() => onSubmit(formData)}
              disabled={!formData.title.trim() || !formData.description.trim() || !formData.startDate || !formData.endDate}
              className={`${!formData.title.trim() || !formData.description.trim() || !formData.startDate || !formData.endDate
                ? "bg-gray-500 cursor-not-allowed text-white"
                : "bg-yellow-400 hover:bg-yellow-500 text-black"
                } font-sukhumvit-semibold text-[14px] px-6 py-2 rounded-[4px] transition-colors`}
            >
              บันทึก
            </PrimaryButton>

          </div>
        </form>
      </div>

    </div>
  )
}

export default LeaveRequestModal
